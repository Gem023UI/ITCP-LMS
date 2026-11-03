import { prisma } from "../utils/prisma";
import { HttpError } from "../utils/httpError";
import { storedQuestionsSchema } from "../utils/learning.validator";
import type { QuizDeadlineInput, QuizInput } from "../utils/manage.validators";
import { quizCardSelect, toQuizCard } from "../utils/quizCard";
import { resyncSubject } from "./subject.service";
import type { Actor } from "./manage.service";

const isUniqueViolation = (err: unknown) =>
  typeof err === "object" && err !== null && "code" in err && err.code === "P2002";

/* Quizzes are teacher-only: only the teacher who owns the subject can create, edit or delete. */

async function ownedSubject(actor: Actor, subjectId: string) {
  if (actor.role !== "TEACHER") throw new HttpError(403, "Only teachers can manage quizzes");
  const subject = await prisma.subject.findUnique({
    where: { id: subjectId },
    select: { id: true, title: true, teacherId: true },
  });
  if (!subject) throw new HttpError(404, "Subject not found");
  if (subject.teacherId !== actor.userId) throw new HttpError(403, "You can only manage your own subjects");
  return subject;
}

async function ownedQuiz(actor: Actor, quizId: string) {
  if (actor.role !== "TEACHER") throw new HttpError(403, "Only teachers can manage quizzes");
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      subject: { select: { id: true, title: true, teacherId: true } },
      coverage: { select: { chapterId: true } },
      _count: { select: { attempts: true } },
    },
  });
  if (!quiz) throw new HttpError(404, "Quiz not found");
  if (quiz.subject.teacherId !== actor.userId) throw new HttpError(403, "You can only manage your own quizzes");
  return quiz;
}

/** every covered chapter must belong to the quiz's own subject */
async function assertChapters(subjectId: string, chapterIds: string[]) {
  const unique = [...new Set(chapterIds)];
  if (unique.length === 0) throw new HttpError(400, "Select at least one chapter");
  const found = await prisma.chapter.count({ where: { id: { in: unique }, subjectId } });
  if (found !== unique.length) {
    throw new HttpError(400, "Quiz coverage must only include chapters from this subject");
  }
  return unique;
}

const toDeadline = (v: string | null | undefined) => (v ? new Date(v) : null);

const assertFuture = (d: Date | null) => {
  if (d && d.getTime() <= Date.now()) throw new HttpError(400, "Pick a deadline in the future");
};

const withNumbers = (input: QuizInput) => input.questions.map((q, i) => ({ questionNo: i + 1, ...q }));

/* ---------- reads ---------- */

export async function listSubjectQuizzes(actor: Actor, subjectId: string) {
  await ownedSubject(actor, subjectId);
  const rows = await prisma.quiz.findMany({
    where: { subjectId },
    orderBy: { quizNo: "asc" },
    select: { ...quizCardSelect, _count: { select: { attempts: true } } },
  });
  return rows.map(({ _count, ...q }) => ({ ...toQuizCard(q), attemptCount: _count.attempts }));
}

/** what the "new quiz" form needs: the next number and its default title */
export async function quizDefaults(actor: Actor, subjectId: string) {
  const subject = await ownedSubject(actor, subjectId);
  const { _max } = await prisma.quiz.aggregate({ where: { subjectId }, _max: { quizNo: true } });
  const quizNo = (_max.quizNo ?? 0) + 1; // max + 1, so deleting a quiz can't create duplicate numbers
  return { quizNo, title: `${subject.title} Quiz ${quizNo}` };
}

export async function getQuizForEdit(actor: Actor, quizId: string) {
  const quiz = await ownedQuiz(actor, quizId);
  const card = await prisma.quiz.findUniqueOrThrow({ where: { id: quizId }, select: quizCardSelect });
  return {
    ...toQuizCard(card),
    chapterIds: quiz.coverage.map((c) => c.chapterId),
    questions: storedQuestionsSchema.parse(quiz.questions),
    attemptCount: quiz._count.attempts,
  };
}

/* ---------- writes ---------- */

export async function createQuiz(actor: Actor, subjectId: string, input: QuizInput) {
  const subject = await ownedSubject(actor, subjectId);
  const chapterIds = await assertChapters(subjectId, input.chapterIds);
  const deadline = toDeadline(input.deadline);
  assertFuture(deadline);

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const quiz = await prisma.$transaction(async (tx) => {
        const { _max } = await tx.quiz.aggregate({ where: { subjectId }, _max: { quizNo: true } });
        const quizNo = (_max.quizNo ?? 0) + 1;
        return tx.quiz.create({
          data: {
            subjectId,
            quizNo,
            title: input.title ?? `${subject.title} Quiz ${quizNo}`,
            questions: withNumbers(input),
            deadline,
            deadlineMode: input.deadlineMode,
            coverage: { create: chapterIds.map((chapterId) => ({ chapterId })) },
          },
          select: { id: true, quizNo: true, title: true },
        });
      });
      await resyncSubject(subjectId); // one more quiz for enrolled students to take
      return quiz;
    } catch (err) {
      if (!isUniqueViolation(err)) throw err; // two teachers' tabs raced for the same number: retry
    }
  }
  throw new HttpError(409, "Could not number the quiz. Please try again.");
}

export async function updateQuiz(actor: Actor, quizId: string, input: QuizInput) {
  const quiz = await ownedQuiz(actor, quizId);
  if (quiz._count.attempts > 0) {
    throw new HttpError(409, "Students already took this quiz. You can only extend its deadline.");
  }
  const chapterIds = await assertChapters(quiz.subjectId, input.chapterIds);
  const deadline = toDeadline(input.deadline);
  assertFuture(deadline);

  await prisma.$transaction([
    prisma.quizChapter.deleteMany({ where: { quizId } }),
    prisma.quiz.update({
      where: { id: quizId },
      data: {
        title: input.title ?? quiz.title,
        questions: withNumbers(input),
        deadline,
        deadlineMode: input.deadlineMode,
        coverage: { create: chapterIds.map((chapterId) => ({ chapterId })) },
      },
    }),
  ]);
  await resyncSubject(quiz.subjectId);
}

/** extend only: never earlier than the current deadline, and never in the past */
export async function updateDeadline(actor: Actor, quizId: string, input: QuizDeadlineInput) {
  const quiz = await ownedQuiz(actor, quizId);
  const next = new Date(input.deadline);
  assertFuture(next);
  if (quiz.deadline && next.getTime() < quiz.deadline.getTime()) {
    throw new HttpError(400, "The new deadline can't be earlier than the current one");
  }
  await prisma.quiz.update({ where: { id: quizId }, data: { deadline: next } });
  await resyncSubject(quiz.subjectId); // an expired STRICT quiz may reopen
  return { deadline: next };
}

export async function deleteQuiz(actor: Actor, quizId: string) {
  const quiz = await ownedQuiz(actor, quizId);
  await prisma.quiz.delete({ where: { id: quizId } }); // attempts and coverage cascade
  await resyncSubject(quiz.subjectId);
}
