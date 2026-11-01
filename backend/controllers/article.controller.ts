import type { Request, RequestHandler, Response } from "express";
import * as articles from "../services/article.service";
import { listArticlesQuerySchema } from "../utils/article.validators";
import { HttpError } from "../utils/httpError";

const actor = (res: Response) => ({
  userId: res.locals.userId as string,
  role: res.locals.role as string,
});
const idOf = (req: Request) => String(req.params.id);

export const list: RequestHandler = async (req, res) => {
  const query = listArticlesQuerySchema.safeParse(req.query);
  if (!query.success) throw new HttpError(400, query.error.issues[0]?.message ?? "Invalid query");
  res.json(await articles.listArticles(res.locals.userId, query.data));
};

export const getOne: RequestHandler = async (req, res) => {
  res.json({ article: await articles.getArticle(res.locals.userId, idOf(req)) });
};

export const create: RequestHandler = async (req, res) => {
  res.status(201).json({ article: await articles.createArticle(actor(res), req.body) });
};

export const update: RequestHandler = async (req, res) => {
  res.json({ article: await articles.updateArticle(actor(res), idOf(req), req.body) });
};

export const remove: RequestHandler = async (req, res) => {
  await articles.deleteArticle(actor(res), idOf(req));
  res.status(204).end();
};

export const toggleLike: RequestHandler = async (req, res) => {
  res.json(await articles.toggleLike(res.locals.userId, idOf(req)));
};