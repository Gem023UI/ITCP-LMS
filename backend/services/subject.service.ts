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

/* ------------------------------------------------------------------ */
/* progress = chapter completions + quiz records                       */
/* ------------------------------------------------------------------ */

export type SubjectCounts = {
  totalChapters: number;
  completedChapters: number;
  totalQuizzes: number;
  takenQuizzes: number;
};

/** per-subject chapter/quiz totals and what the student has done, for many subjects at once */
export async function subjectCounts(studentId: string, subjectIds: string[]) {
  const [chTotals, qTotals, chDone, qDone] = await Promise.all([
    prisma.chapter.groupBy({
      by: ["subjectId"],
      where: { subjectId: { in: subjectIds } },
      _count: { _all: true },
    }),
    prisma.quiz.groupBy({
      by: ["subjectId"],
      where: { subjectId: { in: subjectIds } },
      _count: { _all: true },
    }),
    prisma.chapterProgress.findMany({
      where: { studentId, completedAt: { not: null }, chapter: { subjectId: { in: subjectIds } } },
      select: { chapter: { select: { subjectId: true } } },
    }),
    prisma.quizAttempt.findMany({
      where: { studentId, quiz: { subjectId: { in: subjectIds } } },
      select: { quiz: { select: { subjectId: true } } },
    }),
  ]);

  const totals = (rows: { subjectId: string; _count: { _all: number } }[]) =>
    new Map(rows.map((r) => [r.subjectId, r._count._all]));
  const tally = (ids: string[]) => {
    const m = new Map<string, number>();
    for (const id of ids) m.set(id, (m.get(id) ?? 0) + 1);
    return m;
  };
  const chT = totals(chTotals);
  const qT = totals(qTotals);
  const chD = tally(chDone.map((r) => r.chapter.subjectId));
  const qD = tally(qDone.map((r) => r.quiz.subjectId));

  return (sid: string): SubjectCounts => ({
    totalChapters: chT.get(sid) ?? 0,
    completedChapters: chD.get(sid) ?? 0,
    totalQuizzes: qT.get(sid) ?? 0,
    takenQuizzes: qD.get(sid) ?? 0,
  });
}

/** (completed chapters + taken quizzes) / (all chapters + all quizzes), in percent */
export const calcProgress = (c: SubjectCounts) => {
  const total = c.totalChapters + c.totalQuizzes;
  return total ? Math.round(((c.completedChapters + c.takenQuizzes) / total) * 100) : 0;
};

/**
 * Recomputes a student's progress and status for one subject.
 * FINISHED = every chapter completed AND every quiz taken (or missed: STRICT + deadline passed).
 */
export async function syncSubjectStatus(studentId: string, subjectId: string) {
  const [counts, missed] = await Promise.all([
    subjectCounts(studentId, [subjectId]).then((f) => f(subjectId)),
    prisma.quiz.count({
      where: {
        subjectId,
        deadlineMode: "STRICT",
        deadline: { lt: new Date() },
        attempts: { none: { studentId } },
      },
    }),
  ]);
  const progress = calcProgress(counts);
  const finished =
    counts.totalChapters > 0 &&
    counts.completedChapters >= counts.totalChapters &&
    counts.takenQuizzes + missed >= counts.totalQuizzes;

  await prisma.subjectStudent.updateMany({ where: { subjectId, studentId }, data: { progress } });
  if (finished) {
    await prisma.subjectStudent.updateMany({
      where: { subjectId, studentId, status: { not: "FINISHED" } },
      data: { status: "FINISHED", finishedAt: new Date() },
    });
  } else {
    await prisma.subjectStudent.updateMany({
      where: { subjectId, studentId, status: "FINISHED" },
      data: { status: "ONGOING", finishedAt: null },
    });
  }
  return { finished, progress };
}

/** chapters/quizzes were added, removed or re-timed: refresh every enrolled student */
export async function resyncSubject(subjectId: string) {
  const rows = await prisma.subjectStudent.findMany({ where: { subjectId }, select: { studentId: true } });
  await Promise.all(rows.map((r) => syncSubjectStatus(r.studentId, subjectId)));
}

/* ------------------------------------------------------------------ */

export async function listMySubjects(userId: string) {
  const rows = await prisma.subjectStudent.findMany({
    where: { studentId: userId },
    orderBy: { joinedAt: "desc" },
    include: { subject: { include: withCount } },
  });
  const ids = rows.map((r) => r.subjectId);
  const [fin, counts] = await Promise.all([finishedCounts(ids), subjectCounts(userId, ids)]);
  return rows.map((r) => {
    const c = counts(r.subjectId);
    return {
      ...toSubjectDto(r.subject),
      finishedCount: fin.get(r.subjectId) ?? 0,
      ...c,
      progress: calcProgress(c),
      status: r.status,
      joinedAt: r.joinedAt,
    };
  });
}

export async function listPublicSubjects(userId: string) {
  const rows = await prisma.subject.findMany({
    where: { visibility: "PUBLIC", students: { none: { studentId: userId } } },
    orderBy: { createdAt: "desc" },
    include: withCount,
  });
  const fin = await finishedCounts(rows.map((r) => r.id));
  return rows.map((r) => ({ ...toSubjectDto(r), finishedCount: fin.get(r.id) ?? 0 }));
}

async function enroll(userId: string, subjectId: string) {
  try {
    await prisma.subjectStudent.create({ data: { studentId: userId, subjectId } });
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
  const { count } = await prisma.subjectStudent.deleteMany({ where: { studentId: userId, subjectId } });
  if (count === 0) throw new HttpError(404, "You're not taking this subject");
}

export async function assertEnrolled(userId: string, role: string, subjectId: string) {
  if (role === "ADMIN") return;
  if (role === "TEACHER") {
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
      select: { teacherId: true },
    });
    if (subject?.teacherId === userId) return;
    throw new HttpError(403, "You can only view your own subjects");
  }
  const row = await prisma.subjectStudent.findUnique({
    where: { subjectId_studentId: { subjectId, studentId: userId } },
    select: { id: true },
  });
  if (!row) throw new HttpError(403, "You're not enrolled in this subject");
}
