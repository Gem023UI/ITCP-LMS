import { request } from "./learningApi";

export type ArticleAuthor = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  role: "STUDENT" | "TEACHER" | "ADMIN";
};

export type ArticleSection = {
  header: string;
  imageUrl: string | null;
  content: string;
};

export type ArticleSummary = {
  id: string;
  title: string;
  coverImageUrl: string;
  likesCount: number;
  likedByMe: boolean;
  createdAt: string;
  updatedAt: string;
  author: ArticleAuthor;
  excerpt: string;
};

export type ArticleDetail = Omit<ArticleSummary, "excerpt"> & {
  sections: ArticleSection[];
};

export type ArticleInput = {
  title: string;
  coverImageUrl: string;
  sections: ArticleSection[];
};

export type ArticleListParams = {
  page?: number;
  limit?: number;
  sort?: "latest" | "popular";
  authorId?: string;
};

const toQuery = (params: ArticleListParams) => {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v !== undefined) q.set(k, String(v));
  const s = q.toString();
  return s ? `?${s}` : "";
};

export const articlesApi = {
  list: (params: ArticleListParams = {}) =>
    request<{ articles: ArticleSummary[]; page: number; limit: number; total: number }>(
      `/articles${toQuery(params)}`,
    ),
  get: (id: string) => request<{ article: ArticleDetail }>(`/articles/${encodeURIComponent(id)}`),
  create: (body: ArticleInput) =>
    request<{ article: ArticleDetail }>("/articles", { method: "POST", body }),
  update: (id: string, body: ArticleInput) =>
    request<{ article: ArticleDetail }>(`/articles/${encodeURIComponent(id)}`, { method: "PUT", body }),
  remove: (id: string) => request<void>(`/articles/${encodeURIComponent(id)}`, { method: "DELETE" }),
  /** like <-> unlike; returns the fresh counter */
  toggleLike: (id: string) =>
    request<{ liked: boolean; likesCount: number }>(`/articles/${encodeURIComponent(id)}/like`, {
      method: "POST",
    }),
};

export const authorName = (a: ArticleAuthor) => `${a.firstName} ${a.lastName}`.trim();

/** ~200 wpm, same estimate the old article store used */
export const readMinutes = (sections: ArticleSection[]) => {
  const words = sections.reduce((n, s) => n + s.content.split(/\s+/).filter(Boolean).length, 0);
  return Math.max(1, Math.ceil(words / 200));
};