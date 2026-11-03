import { dayRange, toDay } from "./tz";

/** what every quiz list query selects (questions are left out on purpose) */
export const quizCardSelect = {
  id: true,
  quizNo: true,
  title: true,
  deadline: true,
  deadlineMode: true,
  subject: { select: { id: true, title: true } },
  coverage: {
    select: { chapter: { select: { id: true, chapterNo: true, title: true } } },
    orderBy: { chapter: { chapterNo: "asc" } },
  },
} as const;

export type QuizCardRow = {
  id: string;
  quizNo: number;
  title: string;
  deadline: Date | null;
  deadlineMode: "STRICT" | "LATE";
  subject: { id: string; title: string };
  coverage: { chapter: { id: string; chapterNo: number; title: string } }[];
};

export const toQuizCard = (q: QuizCardRow) => ({
  id: q.id,
  quizNo: q.quizNo,
  title: q.title,
  subjectId: q.subject.id,
  subjectTitle: q.subject.title,
  deadline: q.deadline,
  deadlineMode: q.deadlineMode,
  chapters: q.coverage.map((c) => c.chapter),
});

export type QuizGroup = "dueToday" | "upcoming" | "missed" | "completed";

/**
 * - taken + deadline passed (or no deadline)   -> completed
 * - not taken + deadline passed                -> missed (STRICT = closed, LATE = can still be submitted late)
 * - deadline later today                       -> dueToday
 * - everything else (future day / no deadline) -> upcoming
 */
export function classifyQuiz(
  q: { deadline: Date | null },
  taken: boolean,
  now = new Date(),
): QuizGroup {
  if (q.deadline && q.deadline <= now) return taken ? "completed" : "missed";
  if (!q.deadline) return taken ? "completed" : "upcoming";
  const { start, end } = dayRange(toDay(now));
  return q.deadline >= start && q.deadline < end ? "dueToday" : "upcoming";
}

/** STRICT quiz past its deadline that the student never took */
export const isClosed = (
  q: { deadline: Date | null; deadlineMode: string },
  taken: boolean,
  now = new Date(),
) => !taken && q.deadlineMode === "STRICT" && !!q.deadline && q.deadline <= now;
