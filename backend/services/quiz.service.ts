import { prisma } from "../utils/prisma";
import { HttpError } from "../utils/httpError";
import { assertEnrolled, syncSubjectStatus } from "./subject.service";
import {
  storedAnswersSchema,
  storedQuestionsSchema,
  type StoredQuestion,
  type SubmittedAnswer,
} from "../utils/learning.validator";

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

async function loadContext(userId: string, role: string, chapterId: string) {
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    include: { quiz: true },
  });
  if (!chapter?.quiz) throw new HttpError(404, "This chapter has no quiz");
  await assertEnrolled(userId, role, chapter.subjectId);
  const questions = storedQuestionsSchema
    .parse(chapter.quiz.questions)
    .sort((a, b) => a.questionNo - b.questionNo);
  return { chapter, quiz: chapter.quiz, questions };
}

export async function getQuiz(userId: string, role: string, chapterId: string) {
  const { chapter, quiz, questions } = await loadContext(userId, role, chapterId);
  const attempt = await prisma.quizAttempt.findUnique({
    where: { quizId_userId: { quizId: quiz.id, userId } },
  });

  const result = attempt
    ? {
        score: attempt.score,
        total: attempt.total,
        submittedAt: attempt.createdAt,
        items: grade(questions, storedAnswersSchema.parse(attempt.answers)).items,
      }
    : null;

  return {
    quizId: quiz.id,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    subjectId: chapter.subjectId,
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
  chapterId: string,
  answers: SubmittedAnswer[],
) {
  const { chapter, quiz, questions } = await loadContext(userId, role, chapterId);
  const { score, total, items } = grade(questions, answers);

  let attempt;
  try {
    attempt = await prisma.quizAttempt.create({
      data: { quizId: quiz.id, userId, score, total, answers },
    });
  } catch (err) {
    if (isUniqueViolation(err)) throw new HttpError(409, "You've already taken this quiz");
    throw err;
  }

  const subjectFinished = await syncSubjectStatus(userId, chapter.subjectId);
  return { score, total, submittedAt: attempt.createdAt, items, subjectFinished };
}