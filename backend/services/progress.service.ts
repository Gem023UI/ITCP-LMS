import { prisma } from "../utils/prisma";
import { HttpError } from "../utils/httpError";
import { calcProgress, subjectCounts, syncSubjectStatus } from "./subject.service";
import { DAY_MS, dayStart, shiftDay, toDay, toDbDate } from "../utils/tz";

const WINDOW_DAYS = 365; // rolling 12 months (heatmap)
const QUIZ_WINDOW_DAYS = 30; // quiz graph

/** the chapter + the student's enrollment in its subject (403 if not enrolled) */
async function enrolledChapter(studentId: string, chapterId: string) {
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
    select: { id: true, subjectId: true },
  });
  if (!chapter) throw new HttpError(404, "Chapter not found");

  const enrollment = await prisma.subjectStudent.findUnique({
    where: { subjectId_studentId: { subjectId: chapter.subjectId, studentId } },
    select: { id: true },
  });
  if (!enrollment) throw new HttpError(403, "You are not enrolled in this subject");
  return chapter;
}

/** today's heatmap cell + streak */
const bumpActivity = (studentId: string) => {
  const date = toDbDate(toDay(new Date()));
  return prisma.studyActivity.upsert({
    where: { studentId_date: { studentId, date } },
    create: { studentId, date, count: 1 },
    update: { count: { increment: 1 } },
  });
};

/* ------------------------------------------------------------------ */
/* chapters: reading position (resume) and explicit completion         */
/* ------------------------------------------------------------------ */

export async function getChapterProgress(studentId: string, chapterId: string) {
  const row = await prisma.chapterProgress.findUnique({
    where: { studentId_chapterId: { studentId, chapterId } },
    select: { percent: true, completedAt: true },
  });
  return { percent: row?.percent ?? 0, completed: !!row?.completedAt };
}

/** reading position only: used to resume the lesson, it does NOT count toward progress */
export async function saveChapterPercent(studentId: string, chapterId: string, percent: number) {
  await enrolledChapter(studentId, chapterId);

  const existing = await prisma.chapterProgress.findUnique({
    where: { studentId_chapterId: { studentId, chapterId } },
    select: { percent: true },
  });
  const next = Math.max(existing?.percent ?? 0, percent); // never goes backwards
  await prisma.chapterProgress.upsert({
    where: { studentId_chapterId: { studentId, chapterId } },
    create: { studentId, chapterId, percent: next },
    update: { percent: next },
  });

  if (percent > 0) await bumpActivity(studentId);
  return { percent: next };
}

/** "Mark as Complete": one way, safe to call twice */
export async function completeChapter(studentId: string, chapterId: string) {
  const chapter = await enrolledChapter(studentId, chapterId);

  const existing = await prisma.chapterProgress.findUnique({
    where: { studentId_chapterId: { studentId, chapterId } },
    select: { completedAt: true },
  });
  if (!existing?.completedAt) {
    const completedAt = new Date();
    await prisma.chapterProgress.upsert({
      where: { studentId_chapterId: { studentId, chapterId } },
      create: { studentId, chapterId, percent: 0, completedAt },
      update: { completedAt },
    });
    await bumpActivity(studentId);
  }

  const { finished, progress } = await syncSubjectStatus(studentId, chapter.subjectId);
  return { completed: true, subjectProgress: progress, subjectFinished: finished };
}

/* ------------------------------------------------------------------ */

export async function getHome(userId: string) {
  const today = toDay(new Date());
  const from = shiftDay(today, -(WINDOW_DAYS - 1));

  const [enrollments, logs, attempts] = await Promise.all([
    prisma.subjectStudent.findMany({
      where: { studentId: userId, status: "ONGOING" },
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
            _count: { select: { students: { where: { status: "ONGOING" } } } },
          },
        },
      },
    }),
    prisma.studyActivity.findMany({
      where: { studentId: userId, date: { gte: toDbDate(from) } },
      select: { date: true, count: true },
    }),
    prisma.quizAttempt.findMany({
      where: { studentId: userId, createdAt: { gte: new Date(Date.parse(`${from}T00:00:00Z`) - DAY_MS) } },
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

  let streak = 0;
  let d = (activity[today] ?? 0) > 0 ? today : shiftDay(today, -1);
  for (; (activity[d] ?? 0) > 0; d = shiftDay(d, -1)) streak++;

  // progress = chapter completions + quiz records (self-heals the stored value)
  const counts = await subjectCounts(
    userId,
    enrollments.map((e) => e.subject.id),
  );
  const rows = enrollments.map((e) => {
    const c = counts(e.subject.id);
    return { e, c, progress: calcProgress(c) };
  });
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
    subjects: rows.map(({ e, c, progress }) => ({
      id: e.subject.id,
      title: e.subject.title,
      description: e.subject.description,
      mediaUrl: e.subject.mediaUrl,
      visibility: e.subject.visibility,
      studentCount: e.subject._count.students,
      status: e.status,
      joinedAt: e.joinedAt,
      progress,
      ...c, // completedChapters, totalChapters, takenQuizzes, totalQuizzes
    })),
  };
}

/* ------------------------------------------------------------------ */
/* student profile: quiz stats row + quiz graph                        */
/* ------------------------------------------------------------------ */

export async function getQuizStats(studentId: string) {
  const now = new Date();
  const from = dayStart(shiftDay(toDay(now), -(QUIZ_WINDOW_DAYS - 1)));

  const all = await prisma.quizAttempt.findMany({
    where: { studentId },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      score: true,
      total: true,
      isLate: true,
      createdAt: true,
      quiz: { select: { id: true, title: true, subject: { select: { title: true } } } },
    },
  });

  const sumScore = all.reduce((n, a) => n + a.score, 0);
  const sumTotal = all.reduce((n, a) => n + a.total, 0);

  return {
    // stats row: all attempts, all time
    quizzesCompleted: all.length,
    percentPerQuiz: sumTotal ? Math.round((sumScore / sumTotal) * 100) : 0, // total score / total items
    averageScore: all.length ? Math.round((sumScore / all.length) * 10) / 10 : 0,
    // graph: one point per attempt, last 30 days
    windowDays: QUIZ_WINDOW_DAYS,
    from,
    to: now,
    points: all
      .filter((a) => a.createdAt >= from)
      .map((a) => ({
        id: a.id,
        date: a.createdAt,
        quizId: a.quiz.id,
        title: a.quiz.title,
        subjectTitle: a.quiz.subject.title,
        score: a.score,
        total: a.total,
        isLate: a.isLate,
      })),
  };
}
