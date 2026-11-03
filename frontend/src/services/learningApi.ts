import { ApiError } from "./authApi";
import type { CloudComputingChapter } from "../types/modules";
import type { ChapterCardData } from "../data/chapters";

const API_URL =
  (import.meta.env.VITE_RENDER_URL as string | undefined) ?? "http://localhost:4000";

export type DeadlineMode = "STRICT" | "LATE";

export type SubjectSummary = {
  id: string;
  title: string;
  description: string;
  mediaUrl: string;
  visibility: "PUBLIC" | "PRIVATE";
  studentCount: number;
  finishedCount: number;
};
export type MySubject = SubjectSummary & {
  status: "ONGOING" | "FINISHED";
  joinedAt: string;
  /** progress = chapter completions + quiz records, in percent */
  progress: number;
  completedChapters: number;
  totalChapters: number;
  takenQuizzes: number;
  totalQuizzes: number;
};

export type ApiChapter = CloudComputingChapter & {
  id: string;
  subjectId: string;
  chapterNo: number;
  /** set by "Mark as Complete" */
  completed: boolean;
  completedAt: string | null;
  /** how many quizzes cover this chapter */
  quizCount: number;
};

/* ---------- quizzes ---------- */

export type QuizChapterRef = { id: string; chapterNo: number; title: string };
export type QuizGroup = "dueToday" | "upcoming" | "missed" | "completed";

/** what a quiz card shows (same shape for students and teachers) */
export type QuizCardData = {
  id: string;
  quizNo: number;
  title: string;
  subjectId: string;
  subjectTitle: string;
  deadline: string | null; // null = no deadline
  deadlineMode: DeadlineMode;
  chapters: QuizChapterRef[];
  attemptCount?: number; // teacher side
};
export type StudentQuizCard = QuizCardData & {
  taken: boolean;
  result: { score: number; total: number; isLate: boolean } | null;
  /** STRICT quiz past its deadline that was never taken */
  closed: boolean;
  group: QuizGroup;
};
export type QuizLists = {
  /** today's date (YYYY-MM-DD) in the server's timezone */
  today: string;
  dueToday: StudentQuizCard[];
  upcoming: StudentQuizCard[];
  missed: StudentQuizCard[];
  completed: StudentQuizCard[];
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
  isLate: boolean;
  submittedAt: string;
  items: QuizResultItem[];
};
export type QuizPayload = QuizCardData & {
  closed: boolean;
  questions: QuizQuestion[];
  result: QuizResult | null;
};
export type SubmitResult = QuizResult & { subjectFinished: boolean; subjectProgress: number };

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

// the API no longer sends `chapterId`; the UI still reads it, so derive the same "chapter-01" value
type RawChapter = Omit<ApiChapter, "chapterId">;
const withChapterId = (c: RawChapter): ApiChapter => ({
  ...c,
  chapterId: `chapter-${String(c.chapterNo).padStart(2, "0")}`,
});

export const chaptersApi = {
  bySubject: (subjectId: string) =>
    request<{ chapters: RawChapter[] }>(`/chapters?subjectId=${encodeURIComponent(subjectId)}`).then(
      (r) => ({ chapters: r.chapters.map(withChapterId) }),
    ),
  get: (id: string) =>
    request<{ chapter: RawChapter }>(`/chapters/${id}`).then((r) => ({
      chapter: withChapterId(r.chapter),
    })),
};

export const quizApi = {
  /** the student's quizzes, split into dueToday / upcoming / missed / completed */
  list: () => request<QuizLists>("/quizzes"),
  get: (quizId: string) => request<{ quiz: QuizPayload }>(`/quizzes/${quizId}`),
  submit: (quizId: string, answers: { questionNo: number; answer: string }[]) =>
    request<{ result: SubmitResult }>(`/quizzes/${quizId}/submit`, { method: "POST", body: { answers } }),
};

export const toChapterCard = (c: ApiChapter): ChapterCardData => ({
  id: c.id,
  chapterNo: c.chapterNo,
  title: c.title,
  description: c.description,
  image: c.cardImage,
  chapter: c,
});
