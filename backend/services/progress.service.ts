import { prisma } from "../utils/prisma";
import { HttpError } from "../utils/httpError";

/** Day boundaries (streaks, heatmap) are calculated in this timezone. */
const TZ = process.env.APP_TZ || "Asia/Manila";
const DAY = 86_400_000;
const WINDOW_DAYS = 365; // rolling 12 months

const dayFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}); // -> YYYY-MM-DD

const toDay = (d: Date) => dayFmt.format(d);
const shiftDay = (day: string, n: number) =>
  new Date(Date.parse(`${day}T00:00:00Z`) + n * DAY).toISOString().slice(0, 10);
const toDbDate = (day: string) => new Date(`${day}T00:00:00Z`);

/** chapterId -> percent. A submitted quiz always means 100%. */
async function chapterPercents(userId: string, chapterIds: string[]) {
  const [rows, attempts] = await Promise.all([
    prisma.chapterProgress.findMany({
      where: { userId, chapterId: { in: chapterIds } },
      select: { chapterId: true, percent: true },
    }),
    prisma.quizAttempt.findMany({
      where: { userId, quiz: { chapterId: { in: chapterIds } } },
      select: { quiz: { select: { chapterId: true } } },
    }),
  ]);
  const map = new Map<string, number>(rows.map((r) => [r.chapterId, r.percent]));
  for (const a of attempts) map.set(a.quiz.chapterId, 100);
  return map;
}

const average = (ids: string[], percents: Map<string, number>) =>
  ids.length ? Math.round(ids.reduce((sum, id) => sum + (percents.get(id) ?? 0), 0) / ids.length) : 0;

/* ------------------------------------------------------------------ */

export async function getChapterPercent(userId: string, chapterId: string) {
  const map = await chapterPercents(userId, [chapterId]);
  return map.get(chapterId) ?? 0;
}

export async function saveChapterPercent(userId: string, chapterId: string, percent: number) {
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    select: { id: true, subjectId: true },
  });
  if (!chapter) throw new HttpError(404, "Chapter not found");

  const enrollment = await prisma.subjectStudent.findUnique({
    where: { subjectId_userId: { subjectId: chapter.subjectId, userId } },
    select: { id: true },
  });
  if (!enrollment) throw new HttpError(403, "You are not enrolled in this subject");

  // progress never goes backwards
  const existing = await prisma.chapterProgress.findUnique({
    where: { userId_chapterId: { userId, chapterId } },
    select: { percent: true },
  });
  const next = Math.max(existing?.percent ?? 0, percent);
  await prisma.chapterProgress.upsert({
    where: { userId_chapterId: { userId, chapterId } },
    create: { userId, chapterId, percent: next },
    update: { percent: next },
  });

  // subject progress = average of its chapters, stored on subject_students
  const chapters = await prisma.chapter.findMany({
    where: { subjectId: chapter.subjectId },
    select: { id: true },
  });
  const ids = chapters.map((c) => c.id);
  const subjectProgress = average(ids, await chapterPercents(userId, ids));
  await prisma.subjectStudent.update({
    where: { id: enrollment.id },
    data: { progress: subjectProgress },
  });

  // study activity for today's heatmap cell + streak
  if (percent > 0) {
    const date = toDbDate(toDay(new Date()));
    await prisma.studyActivity.upsert({
      where: { userId_date: { userId, date } },
      create: { userId, date, count: 1 },
      update: { count: { increment: 1 } },
    });
  }

  return { percent: next, subjectProgress };
}

export async function getHome(userId: string) {
  const today = toDay(new Date());
  const from = shiftDay(today, -(WINDOW_DAYS - 1));

  const [enrollments, logs, attempts] = await Promise.all([
    prisma.subjectStudent.findMany({
      where: { userId, status: "ONGOING" },
      orderBy: { joinedAt: "desc" }, // latest -> earliest
      select: {
        id: true,
        status: true,
        joinedAt: true,
        progress: true,
        subject: {
          select: {
            id: true,
            title: true,
            description: true,
            mediaUrl: true,
            visibility: true,
            chapters: { select: { id: true } },
            _count: { select: { students: { where: { status: "ONGOING" } } } },
          },
        },
      },
    }),
    prisma.studyActivity.findMany({
      where: { userId, date: { gte: toDbDate(from) } },
      select: { date: true, count: true },
    }),
    prisma.quizAttempt.findMany({
      where: { userId, createdAt: { gte: new Date(Date.parse(`${from}T00:00:00Z`) - DAY) } },
      select: { createdAt: true },
    }),
  ]);

  // heatmap: study activity + submitted quizzes, bucketed per day
  const activity: Record<string, number> = {};
  for (const l of logs) {
    const d = l.date.toISOString().slice(0, 10);
    activity[d] = (activity[d] ?? 0) + l.count;
  }
  for (const a of attempts) {
    const d = toDay(a.createdAt);
    if (d >= from) activity[d] = (activity[d] ?? 0) + 1;
  }

  // streak: consecutive active days ending today; nothing today -> 0
  let streak = 0;
  for (let d = today; (activity[d] ?? 0) > 0; d = shiftDay(d, -1)) streak++;

  // subject progress (self-heals the stored value, e.g. after a quiz submit)
  const allIds = enrollments.flatMap((e) => e.subject.chapters.map((c) => c.id));
  const percents = allIds.length ? await chapterPercents(userId, allIds) : new Map<string, number>();
  const rows = enrollments.map((e) => ({
    e,
    progress: average(
      e.subject.chapters.map((c) => c.id),
      percents,
    ),
  }));
  const stale = rows.filter((r) => r.progress !== r.e.progress);
  if (stale.length) {
    await Promise.all(
      stale.map((r) =>
        prisma.subjectStudent.update({ where: { id: r.e.id }, data: { progress: r.progress } }),
      ),
    );
  }

  return {
    today,
    streak,
    activity,
    subjects: rows.map(({ e, progress }) => ({
      id: e.subject.id,
      title: e.subject.title,
      description: e.subject.description,
      mediaUrl: e.subject.mediaUrl,
      visibility: e.subject.visibility,
      studentCount: e.subject._count.students,
      status: e.status,
      joinedAt: e.joinedAt,
      progress,
    })),
  };
}