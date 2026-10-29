import { ApiError } from "./authApi";
import type { CloudComputingChapter } from "../types/modules";
import type { ChapterCardData } from "../data/chapters";

const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:4000";

export type SubjectSummary = {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  visibility: "PUBLIC" | "PRIVATE";
  studentCount: number;
};
export type MySubject = SubjectSummary & {
  status: "ONGOING" | "FINISHED";
  joinedAt: string;
};

export type ApiChapter = CloudComputingChapter & {
  id: string;
  subjectId: string;
  chapterNo: number;
  hasQuiz: boolean;
  quizResult: { score: number; total: number } | null;
};

export type QuizQuestion = {
  questionNo: number;
  type: "multiple_choice" | "identification";
  question: string;
  choices: string[];
};
export type QuizResultItem = {
  questionNo: number;
  yourAnswer: string;
  correctAnswer: string;
  correct: boolean;
};
export type QuizResult = {
  score: number;
  total: number;
  submittedAt: string;
  items: QuizResultItem[];
};
export type QuizPayload = {
  quizId: string;
  chapterId: string;
  chapterTitle: string;
  subjectId: string;
  questions: QuizQuestion[];
  result: QuizResult | null;
};

export async function request<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api${path}`, {
      method: options.method ?? "GET",
      credentials: "include",
      headers: options.body ? { "Content-Type": "application/json" } : undefined,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Cannot reach the server. Please try again.");
  }
  if (res.status === 204) return undefined as T;
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, data?.message ?? "Request failed", data?.errors ?? {});
  return data as T;
}

export const subjectsApi = {
  mine: () => request<{ subjects: MySubject[] }>("/subjects/mine"),
  listPublic: () => request<{ subjects: SubjectSummary[] }>("/subjects/public"),
  joinByCode: (code: string) =>
    request<{ subject: SubjectSummary }>("/subjects/join", { method: "POST", body: { code } }),
  joinPublic: (id: string) =>
    request<{ subject: SubjectSummary }>(`/subjects/${id}/join`, { method: "POST" }),
  leave: (id: string) => request<void>(`/subjects/${id}/leave`, { method: "DELETE" }),
};

export const chaptersApi = {
  bySubject: (subjectId: string) =>
    request<{ chapters: ApiChapter[] }>(`/chapters?subjectId=${encodeURIComponent(subjectId)}`),
  get: (id: string) => request<{ chapter: ApiChapter }>(`/chapters/${id}`),
};

export const quizApi = {
  get: (chapterId: string) => request<{ quiz: QuizPayload }>(`/quizzes/chapter/${chapterId}`),
  submit: (chapterId: string, answers: { questionNo: number; answer: string }[]) =>
    request<{ result: QuizResult & { subjectFinished: boolean } }>(
      `/quizzes/chapter/${chapterId}/submit`,
      { method: "POST", body: { answers } },
    ),
};

// adapts an API chapter to the card shape the existing carousel/details components expect
export const toChapterCard = (c: ApiChapter): ChapterCardData =>
  ({ id: c.id, chapterNo: c.chapterNo, chapter: c }) as ChapterCardData;