import { prisma } from "../utils/prisma";
import { HttpError } from "../utils/httpError";

const userSelect = {
  id: true,
  tuptId: true,
  email: true,
  firstName: true,
  lastName: true,
  imageUrl: true,
  role: true,
  status: true,
  createdAt: true,
} as const;

export async function listUsers(role?: "TEACHER" | "STUDENT") {
  return prisma.user.findMany({
    where: { role: role ?? { in: ["TEACHER", "STUDENT"] } },
    orderBy: { createdAt: "desc" },
    select: userSelect,
  });
}

export async function setUserStatus(
  actorId: string,
  targetId: string,
  status: "VERIFY" | "ACTIVE" | "INACTIVE" | "DEACTIVATED",
) {
  if (actorId === targetId) throw new HttpError(400, "You can't change your own status");
  const target = await prisma.user.findUnique({ where: { id: targetId }, select: { role: true } });
  if (!target) throw new HttpError(404, "User not found");
  if (target.role === "ADMIN") throw new HttpError(403, "Admin accounts can't be changed here");
  return prisma.user.update({ where: { id: targetId }, data: { status }, select: userSelect });
}

export async function listAllSubjects() {
  const rows = await prisma.subject.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      teacher: { select: { user: { select: { firstName: true, lastName: true } } } },
      _count: { select: { chapters: true, students: { where: { status: "ONGOING" } } } },
    },
  });
  const fin = await prisma.subjectStudent.groupBy({
    by: ["subjectId"],
    where: { subjectId: { in: rows.map((r) => r.id) }, status: "FINISHED" },
    _count: { _all: true },
  });
  const finished = new Map(fin.map((f) => [f.subjectId, f._count._all]));

  return rows.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    mediaUrl: s.mediaUrl,
    visibility: s.visibility,
    code: s.code,
    teacherName: `${s.teacher.user.firstName} ${s.teacher.user.lastName}`,
    studentCount: s._count.students,
    finishedCount: finished.get(s.id) ?? 0,
    chapterCount: s._count.chapters,
  }));
}

/** card-level data only: no videos, slides, sections or key terms */
export async function listSubjectChapterCards(subjectId: string) {
  const subject = await prisma.subject.findUnique({ where: { id: subjectId }, select: { id: true } });
  if (!subject) throw new HttpError(404, "Subject not found");
  return prisma.chapter.findMany({
    where: { subjectId },
    orderBy: { chapterNo: "asc" },
    select: { id: true, chapterNo: true, title: true, description: true, cardImage: true, durationMinutes: true },
  });
}