import { request, type SubjectSummary } from "./learningApi";

export type ManagedSubject = SubjectSummary & { code: string | null; chapterCount: number };
export type SubjectInput = Pick<SubjectSummary, "title" | "description" | "mediaUrl" | "visibility">;

export type ChapterListItem = {
  id: string;
  chapterId: string;
  chapterNo: number;
  title: string;
  durationMinutes: number;
  hasQuiz: boolean;
};
export type ManagedSubjectDetail = ManagedSubject & { chapters: ChapterListItem[] };

export type ChapterInput = {
  chapterId: string;
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

export type QuizQuestionPayload = {
  type: "multiple_choice" | "identification";
  question: string;
  choices: string[];
  correctAnswer: string;
};
export type ManagedQuiz = {
  questions: (QuizQuestionPayload & { questionNo: number })[];
  attemptCount: number;
};

export type AdminUser = {
  id: string;
  tuptId: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  status: "ACTIVE" | "INACTIVE" | "DEACTIVATED";
  createdAt: string;
};

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

  getQuiz: (chapterId: string) =>
    request<{ quiz: ManagedQuiz | null }>(`/manage/chapters/${chapterId}/quiz`),
  saveQuiz: (chapterId: string, body: { questions: QuizQuestionPayload[] }) =>
    request<void>(`/manage/chapters/${chapterId}/quiz`, { method: "PUT", body }),
  deleteQuiz: (chapterId: string) =>
    request<void>(`/manage/chapters/${chapterId}/quiz`, { method: "DELETE" }),
};

export const adminApi = {
  users: (role: "TEACHER" | "STUDENT") =>
    request<{ users: AdminUser[] }>(`/admin/users?role=${role}`),
  setStatus: (id: string, status: AdminUser["status"]) =>
    request<{ user: AdminUser }>(`/admin/users/${id}/status`, { method: "PATCH", body: { status } }),
};