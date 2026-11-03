import { prisma } from "../utils/prisma";
import { HttpError } from "../utils/httpError";
import { assertEnrolled, syncSubjectStatus } from "./subject.service";
import {
  storedAnswersSchema,
  storedQuestionsSchema,
  type StoredQuestion,
  type SubmittedAnswer,
} from "../utils/learning.validator";
import { classifyQuiz, isClosed, quizCardSelect, toQuizCard } from "../utils/quizCard";
import { toDay } from "../utils/tz";

const norm = (s: string) => s.trim().replace(/\s+/g, " ").toUpperCase();

const isUniqueViolation = (err: unknown) =>
  typeof err === "object" && err !== null && "code" in err && err.code === "P2002";

function grade(questions: StoredQuestion[], answers: SubmittedAnswer[]) {
  const given = new Map(answers.map((a) => [a.questionNo, a.answer]));
  const items = questions.map((q) => {
    const yourAnswer = given.get(q.questionNo) ?? "";
    return {
      questionNo: q.questionNo,
      yourAnswer,
      correctAnswer: q.correctAnswer,
      correct: norm(yourAnswer) !== "" && norm(yourAnswer) === norm(q.correctAnswer),
    };
  });
  return { score: items.filter((i) => i.correct).length, total: questions.length, items };
}

const byDeadline = (dir: 1 | -1) => (a: { deadline: Date | null }, b: { deadline: Date | null }) => {
  const empty = dir === 1 ? Infinity : -Infinity; // no deadline always sorts last
  const at = a.deadline?.getTime() ?? empty;
  const bt = b.deadline?.getTime() ?? empty;
  return at === bt ? 0 : dir * (at - bt);
};

/** the student's quizzes (from enrolled subjects) split into 4 lists */
export async function listQuizzes(studentId: string) {
  const now = new Date();
  const rows = await prisma.quiz.findMany({
    where: { subject: { students: { some: { studentId } } } },
    select: {
      ...quizCardSelect,
      attempts: { where: { studentId }, select: { score: true, total: true, isLate: true } },
    },
  });

  const items = rows.map(({ attempts, ...q }) => {
    const attempt = attempts[0] ?? null;
    const taken = !!attempt;
    return {
      ...toQuizCard(q),
      taken,
      result: attempt,
      closed: isClosed(q, taken, now), // STRICT, deadline passed, never taken
      group: classifyQuiz(q, taken, now),
    };
  });

  const pick = (g: string) => items.filter((i) => i.group === g);
  return {
    today: toDay(now),
    dueToday: pick("dueToday").sort(byDeadline(1)),
    upcoming: pick("upcoming").sort(byDeadline(1)),
    missed: pick("missed").sort(byDeadline(-1)), // most recently missed first
    completed: pick("completed").sort(byDeadline(-1)),
  };
}

async function loadContext(userId: string, role: string, quizId: string) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    select: { ...quizCardSelect, questions: true },
  });
  if (!quiz) throw new HttpError(404, "Quiz not found");
  await assertEnrolled(userId, role, quiz.subject.id);
  const questions = storedQuestionsSchema
    .parse(quiz.questions)
    .sort((a, b) => a.questionNo - b.questionNo);
  return { quiz, questions };
}

export async function getQuiz(userId: string, role: string, quizId: string) {
  const { quiz, questions } = await loadContext(userId, role, quizId);
  const attempt =
    role === "STUDENT"
      ? await prisma.quizAttempt.findUnique({
          where: { quizId_studentId: { quizId, studentId: userId } },
        })
      : null;

  const result = attempt
    ? {
        score: attempt.score,
        total: attempt.total,
        isLate: attempt.isLate,
        submittedAt: attempt.createdAt,
        items: grade(questions, storedAnswersSchema.parse(attempt.answers)).items,
      }
    : null;

  return {
    ...toQuizCard(quiz),
    closed: isClosed(quiz, !!attempt),
    // correct answers are never sent before submission
    questions: questions.map(({ questionNo, type, question, choices }) => ({
      questionNo,
      type,
      question,
      choices,
    })),
    result,
  };
}

export async function submitQuiz(
  userId: string,
  role: string,
  quizId: string,
  answers: SubmittedAnswer[],
) {
  if (role !== "STUDENT") throw new HttpError(403, "Only students can submit quizzes");
  const { quiz, questions } = await loadContext(userId, role, quizId);

  const pastDeadline = !!quiz.deadline && new Date() > quiz.deadline;
  if (pastDeadline && quiz.deadlineMode === "STRICT") {
    throw new HttpError(403, "The deadline for this quiz has passed");
  }

  const { score, total, items } = grade(questions, answers);

  let attempt;
  try {
    attempt = await prisma.quizAttempt.create({
      data: { quizId, studentId: userId, score, total, answers, isLate: pastDeadline },
    });
  } catch (err) {
    if (isUniqueViolation(err)) throw new HttpError(409, "You've already taken this quiz");
    throw err;
  }

  const { finished, progress } = await syncSubjectStatus(userId, quiz.subject.id);
  return {
    score,
    total,
    isLate: attempt.isLate,
    submittedAt: attempt.createdAt,
    items,
    subjectFinished: finished,
    subjectProgress: progress,
  };
}
