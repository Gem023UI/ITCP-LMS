import * as React from "react";
import { ARTICLES, type Article, type ArticleBlock } from "./articles";

let userArticles: Article[] = [];
const listeners = new Set<() => void>();

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};
const getSnapshot = () => userArticles;

export type NewArticleInput = {
  title: string;
  description: string;
  body: string;
  coverUrl: string | null;
};

export function addArticle(input: NewArticleInput): Article {
  const id = `user-${Date.now()}`;
  const paragraphs = input.body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  const content: ArticleBlock[] = paragraphs.map((text) => ({ type: "paragraph", text }));
  const words = input.body.trim().split(/\s+/).filter(Boolean).length;

  const article: Article = {
    id,
    title: input.title.trim(),
    description: input.description.trim(),
    coverUrl: input.coverUrl ?? `https://picsum.photos/seed/${id}/800/600`,
    readMinutes: Math.max(1, Math.ceil(words / 200)),
    likes: 0,
    author: "You",
    publishedAt: new Date().toISOString().slice(0, 10),
    content,
    isUserMade: true,
  };

  userArticles = [article, ...userArticles];
  listeners.forEach((l) => l());
  return article;
}

/** student-made articles first, then the sample data */
export function useArticles(): Article[] {
  const mine = React.useSyncExternalStore(subscribe, getSnapshot);
  return React.useMemo(() => [...mine, ...ARTICLES], [mine]);
}

export function useArticle(id: string): Article | undefined {
  const all = useArticles();
  return React.useMemo(() => all.find((a) => a.id === id), [all, id]);
}