import { prisma } from "../utils/prisma";
import { quizCardSelect, toQuizCard } from "../utils/quizCard";
import { dayRange, dayStart, shiftDay, toDay } from "../utils/tz";

const WINDOW_DAYS = 30;

/** counts per day for the window (oldest -> today), plus today / yesterday for the "% change" badge */
function bucket(days: string[], dates: Date[]) {
  const perDay = new Map<string, number>();
  for (const d of dates) {
    const key = toDay(d);
    perDay.set(key, (perDay.get(key) ?? 0) + 1);
  }
  const series = days.map((d) => perDay.get(d) ?? 0);
  return {
    series,
    today: series[series.length - 1] ?? 0,
    yesterday: series[series.length - 2] ?? 0,
  };
}

export async function teacherDashboard(teacherId: string) {
  const now = new Date();
  const today = toDay(now);
  const days = Array.from({ length: WINDOW_DAYS }, (_, i) => shiftDay(today, i - (WINDOW_DAYS - 1)));
  const from = dayStart(days[0]);
  const todayRange = dayRange(today);

  const [joins, completions, likes, likeTotal, subjects, dueToday] = await Promise.all([
    // students who joined this teacher's subjects
    prisma.subjectStudent.findMany({
      where: { subject: { teacherId }, joinedAt: { gte: from } },
      select: { joinedAt: true },
    }),
    // chapters completed in this teacher's subjects
    prisma.chapterProgress.findMany({
      where: { completedAt: { gte: from }, chapter: { subject: { teacherId } } },
      select: { completedAt: true },
    }),
    // likes received on this teacher's published articles
    prisma.articleLike.findMany({
      where: { createdAt: { gte: from }, article: { authorId: teacherId } },
      select: { createdAt: true },
    }),
    prisma.article.aggregate({ where: { authorId: teacherId }, _sum: { likesCount: true } }),
    prisma.subject.findMany({
      where: { teacherId },
      orderBy: { createdAt: "asc" },
      select: { id: true, title: true, _count: { select: { students: true } } },
    }),
    prisma.quiz.findMany({
      where: { subject: { teacherId }, deadline: { gte: todayRange.start, lt: todayRange.end } },
      orderBy: { deadline: "asc" },
      select: { ...quizCardSelect, _count: { select: { attempts: true } } },
    }),
  ]);

  const perSubject = subjects.map((s) => ({ id: s.id, title: s.title, students: s._count.students }));
  const totalStudents = perSubject.reduce((n, s) => n + s.students, 0); // enrollments, so a student in 2 subjects counts twice

  return {
    today,
    days,
    students: { ...bucket(days, joins.map((j) => j.joinedAt)), total: totalStudents },
    chapters: {
      ...bucket(
        days,
        completions.flatMap((c) => (c.completedAt ? [c.completedAt] : [])),
      ),
      total: completions.length,
    },
    likes: { ...bucket(days, likes.map((l) => l.createdAt)), total: likeTotal._sum.likesCount ?? 0 },
    subjects: perSubject,
    totalStudents,
    deadlineToday: dueToday.map(({ _count, ...q }) => ({ ...toQuizCard(q), attemptCount: _count.attempts })),
  };
}
