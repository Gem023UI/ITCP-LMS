import { prisma } from "../utils/prisma";
import { HttpError } from "../utils/httpError";
import { generateSubjectCode } from "../utils/subjectCode";
import type { ChapterInput, SubjectInput } from "../utils/manage.validators";
import { resyncSubject } from "./subject.service";

export type Actor = { userId: string; role: string };

const isUniqueViolation = (err: unknown) =>
  typeof err === "object" && err !== null && "code" in err && err.code === "P2002";

// admins may edit/delete subjects and chapters; only the owning teacher may create.
// (quizzes are teacher-only: see quizManage.service.ts)
const isOwner = (a: Actor, teacherId: string | null) => a.role === "TEACHER" && teacherId === a.userId;
const canManage = (a: Actor, teacherId: string | null) => a.role === "ADMIN" || isOwner(a, teacherId);

const subjectInclude = {
  _count: {
    select: { students: { where: { status: "ONGOING" } }, chapters: true, quizzes: true },
  },
} as const;

type SubjectRow = {
  id: string;
  code: string | null;
  title: string;
  description: string;
  mediaUrl: string;
  visibility: string;
  _count: { students: number; chapters: number; quizzes: number };
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
  quizCount: s._count.quizzes,
});

async function getManagedSubject(actor: Actor, id: string, create = false) {
  const subject = await prisma.subject.findUnique({ where: { id } });
  if (!subject) throw new HttpError(404, "Subject not found");
  const ok = create ? isOwner(actor, subject.teacherId) : canManage(actor, subject.teacherId);
  if (!ok) throw new HttpError(403, "You can't manage this subject");
  return subject;
}

async function getManagedChapter(actor: Actor, id: string) {
  const chapter = await prisma.chapter.findUnique({
    where: { id },
    include: { subject: { select: { teacherId: true } } },
  });
  if (!chapter) throw new HttpError(404, "Chapter not found");
  if (!canManage(actor, chapter.subject.teacherId)) throw new HttpError(403, "You can't manage this chapter");
  return chapter;
}

/* ---------- subjects ---------- */

export async function listSubjects(actor: Actor) {
  const rows = await prisma.subject.findMany({
    where: actor.role === "ADMIN" ? {} : { teacherId: actor.userId },
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
        chapterNo: true,
        title: true,
        durationMinutes: true,
      },
    }),
  ]);
  return { ...toDto(row), chapters };
}

export async function createSubject(actor: Actor, input: SubjectInput) {
  for (let i = 0; i < 5; i++) {
    try {
      const row = await prisma.subject.create({
        data: {
          ...input,
          teacherId: actor.userId,
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

const DUPLICATE_CHAPTER = "Chapter number is already used in this subject";

export async function getChapterForEdit(actor: Actor, id: string) {
  const { subject: _s, createdAt: _c, updatedAt: _u, ...chapter } = await getManagedChapter(actor, id);
  return chapter;
}

export async function createChapter(actor: Actor, subjectId: string, input: ChapterInput) {
  await getManagedSubject(actor, subjectId, true);
  try {
    const row = await prisma.chapter.create({ data: { subjectId, ...input }, select: { id: true } });
    await resyncSubject(subjectId); // one more chapter to complete
    return row;
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
  await prisma.chapter.delete({ where: { id } }); // its completions and quiz coverage rows cascade
  await resyncSubject(chapter.subjectId);
}
