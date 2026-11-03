import { request, type MySubject } from "./learningApi";

const API_URL =
  (import.meta.env.VITE_VITE_RENDER_URL as string | undefined) ?? "http://localhost:4000";

export type HomeSubject = Omit<MySubject, "finishedCount">;

export type HomeData = {
  /** today's date (YYYY-MM-DD) in the server's timezone */
  today: string;
  streak: number;
  /** YYYY-MM-DD -> number of activities that day (rolling 12 months) */
  activity: Record<string, number>;
  /** ongoing subjects, latest joined first */
  subjects: HomeSubject[];
};

export type QuizStatPoint = {
  id: string;
  date: string; // ISO
  quizId: string;
  title: string;
  subjectTitle: string;
  score: number;
  total: number;
  isLate: boolean;
};
export type QuizStats = {
  /** stats row: all attempts, all time */
  quizzesCompleted: number;
  /** total score / total items across every attempt, in percent */
  percentPerQuiz: number;
  averageScore: number;
  /** graph: one point per attempt inside the window */
  windowDays: number;
  from: string; // ISO
  to: string; // ISO
  points: QuizStatPoint[];
};

export const progressApi = {
  home: () => request<HomeData>("/progress/home"),
  quizStats: () => request<QuizStats>("/progress/quiz-stats"),

  /** reading position (to resume the lesson) + whether the chapter is marked complete */
  chapter: (chapterId: string) =>
    request<{ percent: number; completed: boolean }>(
      `/progress/chapters/${encodeURIComponent(chapterId)}`,
    ),

  /** "Mark as Complete": one way, safe to call twice */
  complete: (chapterId: string) =>
    request<{ completed: boolean; subjectProgress: number; subjectFinished: boolean }>(
      `/progress/chapters/${encodeURIComponent(chapterId)}/complete`,
      { method: "POST" },
    ),

  /** keepalive lets the save finish even while navigating away or closing the tab */
  save: (chapterId: string, percent: number) =>
    fetch(`${API_URL}/api/progress/chapters/${encodeURIComponent(chapterId)}`, {
      method: "PUT",
      credentials: "include",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ percent }),
    }).catch(() => undefined),
};
