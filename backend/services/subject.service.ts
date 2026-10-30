import { prisma } from "../utils/prisma";
import { HttpError } from "../utils/httpError";

const isUniqueViolation = (err: unknown) =>
  typeof err === "object" && err !== null && "code" in err && err.code === "P2002";

const withCount = {
  _count: { select: { students: { where: { status: "ONGOING" } } } },
} as const;

type SubjectRow = {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  visibility: string;
  _count: { students: number };
};

const toSubjectDto = (s: SubjectRow) => ({
  id: s.id,
  title: s.title,
  description: s.description,
  mediaUrl: s.mediaUrl,
  visibility: s.visibility,
  studentCount: s._count.students,
});

async function finishedCounts(subjectIds: string[]) {
  const rows = await prisma.subjectStudent.groupBy({
    by: ["subjectId"],
    where: { subjectId: { in: subjectIds }, status: "FINISHED" },
    _count: { _all: true },
  });
  return new Map(rows.map((r) => [r.subjectId, r._count._all]));
}

async function chapterProgress(userId: string, subjectIds: string[]) {
  const [quizzes, attempts] = await Promise.all([
    prisma.quiz.findMany({
      where: { chapter: { subjectId: { in: subjectIds } } },
      select: { chapterId: true, chapter: { select: { subjectId: true } } },
    }),
    prisma.quizAttempt.findMany({
      where: { userId, quiz: { chapter: { subjectId: { in: subjectIds } } } },
      select: { quiz: { select: { chapterId: true, chapter: { select: { subjectId: true } } } } },
    }),
  ]);
  const total = new Map<string, Set<string>>();
  const done = new Map<string, Set<string>>();
  const add = (m: Map<string, Set<string>>, sid: string, cid: string) => {
    if (!m.has(sid)) m.set(sid, new Set());
    m.get(sid)!.add(cid);
  };
  quizzes.forEach((q) => add(total, q.chapter.subjectId, q.chapterId));
  attempts.forEach((a) => add(done, a.quiz.chapter.subjectId, a.quiz.chapterId));
  return (sid: string) => ({
    completedChapters: done.get(sid)?.size ?? 0,
    totalChapters: total.get(sid)?.size ?? 0,
  });
}

export async function listMySubjects(userId: string) {
  const rows = await prisma.subjectStudent.findMany({
    where: { userId },
    orderBy: { joinedAt: "desc" },
    include: { subject: { include: withCount } },
  });
  const ids = rows.map((r) => r.subjectId);
  const [fin, prog] = await Promise.all([finishedCounts(ids), chapterProgress(userId, ids)]);
  return rows.map((r) => ({
    ...toSubjectDto(r.subject),
    finishedCount: fin.get(r.subjectId) ?? 0,
    ...prog(r.subjectId),
    status: r.status,
    joinedAt: r.joinedAt,
  }));
}

export async function listPublicSubjects(userId: string) {
  const rows = await prisma.subject.findMany({
    where: { visibility: "PUBLIC", students: { none: { userId } } },
    orderBy: { createdAt: "desc" },
    include: withCount,
  });
  const fin = await finishedCounts(rows.map((r) => r.id));
  return rows.map((r) => ({ ...toSubjectDto(r), finishedCount: fin.get(r.id) ?? 0 }));
}
async function enroll(userId: string, subjectId: string) {
  try {
    await prisma.subjectStudent.create({ data: { userId, subjectId } });
  } catch (err) {
    if (isUniqueViolation(err)) throw new HttpError(409, "You're already taking this subject");
    throw err;
  }
  await syncSubjectStatus(userId, subjectId);
}

export async function joinByCode(userId: string, code: string) {
  const subject = await prisma.subject.findUnique({ where: { code }, include: withCount });
  if (!subject) throw new HttpError(404, "Invalid subject code");
  await enroll(userId, subject.id);
  return toSubjectDto(subject);
}

export async function joinPublic(userId: string, subjectId: string) {
  const subject = await prisma.subject.findUnique({ where: { id: subjectId }, include: withCount });
  if (!subject || subject.visibility !== "PUBLIC") throw new HttpError(404, "Subject not found");
  await enroll(userId, subjectId);
  return toSubjectDto(subject);
}

export async function leaveSubject(userId: string, subjectId: string) {
  const { count } = await prisma.subjectStudent.deleteMany({ where: { userId, subjectId } });
  if (count === 0) throw new HttpError(404, "You're not taking this subject");
}

export async function assertEnrolled(userId: string, role: string, subjectId: string) {
  if (role === "ADMIN") return;
  if (role === "TEACHER") {
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
      select: { ownerId: true },
    });
    if (subject?.ownerId === userId) return;
    throw new HttpError(403, "You can only view your own subjects");
  }
  const row = await prisma.subjectStudent.findUnique({
    where: { subjectId_userId: { subjectId, userId } },
    select: { id: true },
  });
  if (!row) throw new HttpError(403, "You're not enrolled in this subject");
}

export async function syncSubjectStatus(userId: string, subjectId: string) {
  const [total, taken] = await Promise.all([
    prisma.quiz.count({ where: { chapter: { subjectId } } }),
    prisma.quizAttempt.count({ where: { userId, quiz: { chapter: { subjectId } } } }),
  ]);
  const finished = total > 0 && taken >= total;
  if (finished) {
    await prisma.subjectStudent.updateMany({
      where: { subjectId, userId, status: { not: "FINISHED" } },
      data: { status: "FINISHED", finishedAt: new Date() },
    });
  } else {
    await prisma.subjectStudent.updateMany({
      where: { subjectId, userId, status: "FINISHED" },
      data: { status: "ONGOING", finishedAt: null },
    });
  }
  return finished;
}