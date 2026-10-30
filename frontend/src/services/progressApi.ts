import { request, type MySubject } from "./learningApi";

const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4000";

export type HomeSubject = MySubject & { progress: number };

export type HomeData = {
  /** today's date (YYYY-MM-DD) in the server's timezone */
  today: string;
  streak: number;
  /** YYYY-MM-DD -> number of activities that day (rolling 12 months) */
  activity: Record<string, number>;
  /** ongoing subjects, latest joined first */
  subjects: HomeSubject[];
};

export const progressApi = {
  home: () => request<HomeData>("/progress/home"),

  chapter: (chapterId: string) =>
    request<{ percent: number }>(`/progress/chapters/${encodeURIComponent(chapterId)}`),

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