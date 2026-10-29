import type { Request, RequestHandler, Response } from "express";
import * as manage from "../services/manage.service";

const actor = (res: Response) => ({
  userId: res.locals.userId as string,
  role: res.locals.role as string,
});
const idOf = (req: Request) => String(req.params.id);

export const listSubjects: RequestHandler = async (_req, res) => {
  res.json({ subjects: await manage.listSubjects(actor(res)) });
};
export const getSubject: RequestHandler = async (req, res) => {
  res.json({ subject: await manage.getSubjectDetail(actor(res), idOf(req)) });
};
export const createSubject: RequestHandler = async (req, res) => {
  res.status(201).json({ subject: await manage.createSubject(actor(res), req.body) });
};
export const updateSubject: RequestHandler = async (req, res) => {
  res.json({ subject: await manage.updateSubject(actor(res), idOf(req), req.body) });
};
export const deleteSubject: RequestHandler = async (req, res) => {
  await manage.deleteSubject(actor(res), idOf(req));
  res.status(204).end();
};

export const createChapter: RequestHandler = async (req, res) => {
  res.status(201).json({ chapter: await manage.createChapter(actor(res), idOf(req), req.body) });
};
export const getChapter: RequestHandler = async (req, res) => {
  res.json({ chapter: await manage.getChapterForEdit(actor(res), idOf(req)) });
};
export const updateChapter: RequestHandler = async (req, res) => {
  res.json({ chapter: await manage.updateChapter(actor(res), idOf(req), req.body) });
};
export const deleteChapter: RequestHandler = async (req, res) => {
  await manage.deleteChapter(actor(res), idOf(req));
  res.status(204).end();
};

export const getQuiz: RequestHandler = async (req, res) => {
  res.json({ quiz: await manage.getQuizForEdit(actor(res), idOf(req)) });
};
export const saveQuiz: RequestHandler = async (req, res) => {
  await manage.saveQuiz(actor(res), idOf(req), req.body);
  res.status(204).end();
};
export const deleteQuiz: RequestHandler = async (req, res) => {
  await manage.deleteQuiz(actor(res), idOf(req));
  res.status(204).end();
};