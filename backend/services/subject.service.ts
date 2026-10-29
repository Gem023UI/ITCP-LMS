import { prisma } from "../utils/prisma";
import { HttpError } from "../utils/httpError";

const isUniqueViolation = (err: unknown) =>
  typeof err === "object" && err !== null && "code" in err && err.code === "P2002";

// "currently taking" = ONGOING students only
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

export async function listMySubjects(userId: string) {
  const rows = await prisma.subjectStudent.findMany({
    where: { userId },
    orderBy: { joinedAt: "desc" },
    include: { subject: { include: withCount } },
  });
  return rows.map((r) => ({ ...toSubjectDto(r.subject), status: r.status, joinedAt: r.joinedAt }));
}

export async function listPublicSubjects(userId: string) {
  const rows = await prisma.subject.findMany({
    where: { visibility: "PUBLIC", students: { none: { userId } } },
    orderBy: { createdAt: "desc" },
    include: withCount,
  });
  return rows.map(toSubjectDto);
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

/** FINISHED once every quiz in the subject has an attempt from this user. */
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