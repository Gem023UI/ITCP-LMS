import { prisma } from "../utils/prisma";
import { HttpError } from "../utils/httpError";
import { generateSubjectCode } from "../utils/subjectCode";
import { storedQuestionsSchema } from "../utils/learning.validator";
import type { ChapterInput, QuizInput, SubjectInput } from "../utils/manage.validators";
import { syncSubjectStatus } from "./subject.service";

export type Actor = { userId: string; role: string };

const isUniqueViolation = (err: unknown) =>
  typeof err === "object" && err !== null && "code" in err && err.code === "P2002";

// admins may edit/delete anything; only the owning teacher may create
const isOwner = (a: Actor, ownerId: string | null) => a.role === "TEACHER" && ownerId === a.userId;
const canManage = (a: Actor, ownerId: string | null) => a.role === "ADMIN" || isOwner(a, ownerId);

const subjectInclude = {
  _count: { select: { students: { where: { status: "ONGOING" } }, chapters: true } },
} as const;

type SubjectRow = {
  id: string;
  code: string | null;
  title: string;
  description: string;
  mediaUrl: string;
  visibility: string;
  _count: { students: number; chapters: number };
};

const toDto = (s: SubjectRow) => ({
  id: s.id,
  code: s.code,
  title: s.title,
  description: s.description,
  mediaUrl: s.mediaUrl,
  visibility: s.visibility,
  studentCount: s._count.students,
  chapterCount: s._count.chapters,
});

async function getManagedSubject(actor: Actor, id: string, create = false) {
  const subject = await prisma.subject.findUnique({ where: { id } });
  if (!subject) throw new HttpError(404, "Subject not found");
  const ok = create ? isOwner(actor, subject.ownerId) : canManage(actor, subject.ownerId);
  if (!ok) throw new HttpError(403, "You can't manage this subject");
  return subject;
}

async function getManagedChapter(actor: Actor, id: string) {
  const chapter = await prisma.chapter.findUnique({
    where: { id },
    include: { subject: { select: { ownerId: true } } },
  });
  if (!chapter) throw new HttpError(404, "Chapter not found");
  if (!canManage(actor, chapter.subject.ownerId)) throw new HttpError(403, "You can't manage this chapter");
  return chapter;
}

// quiz added/removed changes what "finished" means for enrolled students
async function resyncStudents(subjectId: string) {
  const rows = await prisma.subjectStudent.findMany({ where: { subjectId }, select: { userId: true } });
  await Promise.all(rows.map((r) => syncSubjectStatus(r.userId, subjectId)));
}

/* ---------- subjects ---------- */

export async function listSubjects(actor: Actor) {
  const rows = await prisma.subject.findMany({
    where: actor.role === "ADMIN" ? {} : { ownerId: actor.userId },
    orderBy: { createdAt: "desc" },
    include: subjectInclude,
  });
  return rows.map(toDto);
}

export async function getSubjectDetail(actor: Actor, id: string) {
  await getManagedSubject(actor, id);
  const [row, chapters] = await Promise.all([
    prisma.subject.findUniqueOrThrow({ where: { id }, include: subjectInclude }),
    prisma.chapter.findMany({
      where: { subjectId: id },
      orderBy: { chapterNo: "asc" },
      select: {
        id: true,
        chapterId: true,
        chapterNo: true,
        title: true,
        durationMinutes: true,
        quiz: { select: { id: true } },
      },
    }),
  ]);
  return { ...toDto(row), chapters: chapters.map(({ quiz, ...c }) => ({ ...c, hasQuiz: !!quiz })) };
}

export async function createSubject(actor: Actor, input: SubjectInput) {
  for (let i = 0; i < 5; i++) {
    try {
      const row = await prisma.subject.create({
        data: {
          ...input,
          ownerId: actor.userId,
          code: input.visibility === "PRIVATE" ? generateSubjectCode() : null,
        },
        include: subjectInclude,
      });
      return toDto(row);
    } catch (err) {
      if (!isUniqueViolation(err) || input.visibility === "PUBLIC") throw err;
    }
  }
  throw new HttpError(500, "Could not generate a unique subject code");
}

export async function updateSubject(actor: Actor, id: string, input: SubjectInput) {
  const subject = await getManagedSubject(actor, id);
  let code = input.visibility === "PUBLIC" ? null : subject.code;
  for (let i = 0; i < 5; i++) {
    if (input.visibility === "PRIVATE" && !code) code = generateSubjectCode();
    try {
      const row = await prisma.subject.update({
        where: { id },
        data: { ...input, code },
        include: subjectInclude,
      });
      return toDto(row);
    } catch (err) {
      if (!isUniqueViolation(err) || input.visibility === "PUBLIC") throw err;
      code = null;
    }
  }
  throw new HttpError(500, "Could not generate a unique subject code");
}

export async function deleteSubject(actor: Actor, id: string) {
  await getManagedSubject(actor, id);
  await prisma.subject.delete({ where: { id } });
}

/* ---------- chapters ---------- */

const DUPLICATE_CHAPTER = "Chapter ID or number is already used in this subject";

export async function getChapterForEdit(actor: Actor, id: string) {
  const { subject: _s, createdAt: _c, updatedAt: _u, ...chapter } = await getManagedChapter(actor, id);
  return chapter;
}

export async function createChapter(actor: Actor, subjectId: string, input: ChapterInput) {
  await getManagedSubject(actor, subjectId, true);
  try {
    return await prisma.chapter.create({ data: { subjectId, ...input }, select: { id: true } });
  } catch (err) {
    if (isUniqueViolation(err)) throw new HttpError(409, DUPLICATE_CHAPTER);
    throw err;
  }
}

export async function updateChapter(actor: Actor, id: string, input: ChapterInput) {
  await getManagedChapter(actor, id);
  try {
    return await prisma.chapter.update({ where: { id }, data: input, select: { id: true } });
  } catch (err) {
    if (isUniqueViolation(err)) throw new HttpError(409, DUPLICATE_CHAPTER);
    throw err;
  }
}

export async function deleteChapter(actor: Actor, id: string) {
  const chapter = await getManagedChapter(actor, id);
  await prisma.chapter.delete({ where: { id } });
  await resyncStudents(chapter.subjectId);
}

/* ---------- quizzes ---------- */

export async function getQuizForEdit(actor: Actor, chapterId: string) {
  await getManagedChapter(actor, chapterId);
  const quiz = await prisma.quiz.findUnique({
    where: { chapterId },
    include: { _count: { select: { attempts: true } } },
  });
  if (!quiz) return null;
  return {
    questions: storedQuestionsSchema.parse(quiz.questions),
    attemptCount: quiz._count.attempts,
  };
}

export async function saveQuiz(actor: Actor, chapterId: string, input: QuizInput) {
  const chapter = await getManagedChapter(actor, chapterId);
  const existing = await prisma.quiz.findUnique({
    where: { chapterId },
    include: { _count: { select: { attempts: true } } },
  });

  if (existing) {
    if (existing._count.attempts > 0) {
      throw new HttpError(409, "Students already took this quiz. Delete it to rebuild it.");
    }
  } else if (!isOwner(actor, chapter.subject.ownerId)) {
    throw new HttpError(403, "Only the subject's teacher can create a quiz");
  }

  const questions = input.questions.map((q, i) => ({ questionNo: i + 1, ...q }));
  await prisma.quiz.upsert({
    where: { chapterId },
    create: { chapterId, questions },
    update: { questions },
  });
  await resyncStudents(chapter.subjectId);
}

export async function deleteQuiz(actor: Actor, chapterId: string) {
  const chapter = await getManagedChapter(actor, chapterId);
  const { count } = await prisma.quiz.deleteMany({ where: { chapterId } });
  if (count === 0) throw new HttpError(404, "This chapter has no quiz");
  await resyncStudents(chapter.subjectId);
}