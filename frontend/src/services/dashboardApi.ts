import { request } from "./learningApi";
import type { ManagedQuizCard } from "./manageApi";

/** 30 daily counts (oldest -> today) plus the numbers the cards need */
export type DailySeries = {
  series: number[];
  /** count for today / yesterday (Asia/Manila), used for the "% change" badge */
  today: number;
  yesterday: number;
  total: number;
};

export type SubjectCount = { id: string; title: string; students: number };

export type TeacherDashboard = {
  /** today's date (YYYY-MM-DD) in the server's timezone */
  today: string;
  /** the 30 days of every series, oldest -> today (YYYY-MM-DD) */
  days: string[];
  students: DailySeries; // joined this teacher's subjects
  chapters: DailySeries; // chapters completed in this teacher's subjects
  likes: DailySeries; // likes on this teacher's articles (total = all-time likes)
  subjects: SubjectCount[];
  /** enrollments: a student in two of the teacher's subjects counts twice */
  totalStudents: number;
  deadlineToday: ManagedQuizCard[];
};

export type AdminDashboard = {
  today: string;
  days: string[];
  students: DailySeries; // student accounts registered per day (total = all students)
  chapters: DailySeries; // chapters completed in every subject (total = all completions)
  teachers: DailySeries; // teacher accounts registered per day (total = all teachers)
  /** every subject on the platform */
  subjects: SubjectCount[];
  /** enrollments across all subjects: a student in two subjects counts twice */
  totalStudents: number;
};

/** accepts the dashboard bare or wrapped in one key (e.g. `{ dashboard: {...} }`) */
function unwrap<T>(r: unknown): T {
  const isDashboard = (v: unknown): v is T =>
    !!v && typeof v === "object" && Array.isArray((v as { days?: unknown }).days);
  if (isDashboard(r)) return r;
  if (r && typeof r === "object") {
    const inner = Object.values(r as Record<string, unknown>).find(isDashboard);
    if (inner) return inner;
  }
  throw new Error("Unexpected dashboard response");
}

export const dashboardApi = {
  teacher: () => request<unknown>("/dashboard/teacher").then((r) => unwrap<TeacherDashboard>(r)),
  admin: () => request<unknown>("/dashboard/admin").then((r) => unwrap<AdminDashboard>(r)),
};
