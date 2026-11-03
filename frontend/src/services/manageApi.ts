import { request, type SubjectSummary } from "./learningApi";
import type { DeadlineMode, QuizCardData } from "./learningApi";

export type ManagedSubject = SubjectSummary & {
  code: string | null;
  chapterCount: number;
  quizCount: number;
};
export type SubjectInput = Pick<SubjectSummary, "title" | "description" | "mediaUrl" | "visibility">;

export type ChapterListItem = {
  id: string;
  chapterNo: number;
  title: string;
  durationMinutes: number;
};
export type ManagedSubjectDetail = ManagedSubject & { chapters: ChapterListItem[] };

export type ChapterInput = {
  chapterNo: number;
  cardImage: string;
  title: string;
  description: string;
  durationMinutes: number;
  videoUrl: string;
  slideUrl: string;
  objectives: unknown[];
  sections: unknown[];
  keyTerms: unknown[];
  references: unknown[];
};
export type ChapterFull = ChapterInput & { id: string; subjectId: string };

/* ---------- quizzes (subject level) ---------- */

export type QuizQuestionPayload = {
  type: "multiple_choice" | "identification";
  question: string;
  choices: string[];
  correctAnswer: string;
};

/** a quiz card as the teacher sees it: the shared card data + how many students took it */
export type ManagedQuizCard = QuizCardData & { attemptCount: number };

/** what the "new quiz" form needs */
export type QuizDefaults = { quizNo: number; title: string };

/** everything the editor needs to edit one quiz */
export type QuizEditData = ManagedQuizCard & {
  chapterIds: string[];
  questions: (QuizQuestionPayload & { questionNo: number })[];
};

export type QuizInput = {
  /** leave out for the default title ("<Subject> Quiz n") */
  title?: string;
  chapterIds: string[];
  questions: QuizQuestionPayload[];
  deadline?: string | null; // null / undefined = no deadline
  deadlineMode: DeadlineMode;
};

/* ---------- quiz records (the teacher's quiz page) ---------- */

export type QuizRecord = {
  studentId: string;
  firstName: string;
  lastName: string;
  score: number;
  total: number;
  percent: number; // whole number, 0-100
  isLate: boolean;
};

export type QuizRecords = {
  quiz: QuizCardData;
  stats: {
    enrolled: number; // students taking the subject
    taken: number; // students who took this quiz
    averageScore: number; // mean score, 1 decimal
    totalItems: number;
    averagePercent: number;
  };
  records: QuizRecord[];
};

export type AdminUser = {
  id: string;
  tuptId: string | null; // null for ADMIN
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  status: "ACTIVE" | "INACTIVE" | "DEACTIVATED";
  createdAt: string;
};

/** accepts either `{ [key]: value }` or the bare value, so a controller that wraps (or doesn't) both work */
const pick = <T>(r: unknown, key: string): T =>
  r && typeof r === "object" && !Array.isArray(r) && key in r
    ? ((r as Record<string, unknown>)[key] as T)
    : (r as T);

export const manageApi = {
  listSubjects: () => request<{ subjects: ManagedSubject[] }>("/manage/subjects"),
  getSubject: (id: string) => request<{ subject: ManagedSubjectDetail }>(`/manage/subjects/${id}`),
  createSubject: (body: SubjectInput) =>
    request<{ subject: ManagedSubject }>("/manage/subjects", { method: "POST", body }),
  updateSubject: (id: string, body: SubjectInput) =>
    request<{ subject: ManagedSubject }>(`/manage/subjects/${id}`, { method: "PUT", body }),
  deleteSubject: (id: string) => request<void>(`/manage/subjects/${id}`, { method: "DELETE" }),

  createChapter: (subjectId: string, body: ChapterInput) =>
    request<{ chapter: { id: string } }>(`/manage/subjects/${subjectId}/chapters`, {
      method: "POST",
      body,
    }),
  getChapter: (id: string) => request<{ chapter: ChapterFull }>(`/manage/chapters/${id}`),
  updateChapter: (id: string, body: ChapterInput) =>
    request<{ chapter: { id: string } }>(`/manage/chapters/${id}`, { method: "PUT", body }),
  deleteChapter: (id: string) => request<void>(`/manage/chapters/${id}`, { method: "DELETE" }),

  /* quizzes: teacher-only, owned through the subject */
  listQuizzes: (subjectId: string) =>
    request<unknown>(`/manage/subjects/${subjectId}/quizzes`).then((r) =>
      pick<ManagedQuizCard[]>(r, "quizzes"),
    ),
  quizDefaults: (subjectId: string) =>
    request<unknown>(`/manage/subjects/${subjectId}/quiz-defaults`).then((r) =>
      pick<QuizDefaults>(r, "defaults"),
    ),
  createQuiz: (subjectId: string, body: QuizInput) =>
    request<unknown>(`/manage/subjects/${subjectId}/quizzes`, { method: "POST", body }).then((r) =>
      pick<{ id: string; quizNo: number; title: string }>(r, "quiz"),
    ),
  getQuiz: (quizId: string) =>
    request<unknown>(`/manage/quizzes/${quizId}`).then((r) => pick<QuizEditData>(r, "quiz")),
  updateQuiz: (quizId: string, body: QuizInput) =>
    request<void>(`/manage/quizzes/${quizId}`, { method: "PUT", body }),
  /** extend only: not earlier than the current deadline, not in the past */
  updateDeadline: (quizId: string, deadline: string) =>
    request<unknown>(`/manage/quizzes/${quizId}/deadline`, { method: "PATCH", body: { deadline } }),
  deleteQuiz: (quizId: string) => request<void>(`/manage/quizzes/${quizId}`, { method: "DELETE" }),
  quizRecords: (quizId: string) => request<QuizRecords>(`/manage/quizzes/${quizId}/records`),
};

export const adminApi = {
  users: (role: "TEACHER" | "STUDENT") =>
    request<{ users: AdminUser[] }>(`/admin/users?role=${role}`),
  setStatus: (id: string, status: AdminUser["status"]) =>
    request<{ user: AdminUser }>(`/admin/users/${id}/status`, { method: "PATCH", body: { status } }),
};