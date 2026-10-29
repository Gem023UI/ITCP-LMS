import type { RequestHandler, Response } from "express";
import * as manage from "../services/manage.service";

const actor = (res: Response) => ({
  userId: res.locals.userId as string,
  role: res.locals.role as string,
});

export const listSubjects: RequestHandler = async (_req, res) => {
  res.json({ subjects: await manage.listSubjects(actor(res)) });
};
export const getSubject: RequestHandler = async (req, res) => {
  res.json({ subject: await manage.getSubjectDetail(actor(res), req.params.id) });
};
export const createSubject: RequestHandler = async (req, res) => {
  res.status(201).json({ subject: await manage.createSubject(actor(res), req.body) });
};
export const updateSubject: RequestHandler = async (req, res) => {
  res.json({ subject: await manage.updateSubject(actor(res), req.params.id, req.body) });
};
export const deleteSubject: RequestHandler = async (req, res) => {
  await manage.deleteSubject(actor(res), req.params.id);
  res.status(204).end();
};

export const createChapter: RequestHandler = async (req, res) => {
  res.status(201).json({ chapter: await manage.createChapter(actor(res), req.params.id, req.body) });
};
export const getChapter: RequestHandler = async (req, res) => {
  res.json({ chapter: await manage.getChapterForEdit(actor(res), req.params.id) });
};
export const updateChapter: RequestHandler = async (req, res) => {
  res.json({ chapter: await manage.updateChapter(actor(res), req.params.id, req.body) });
};
export const deleteChapter: RequestHandler = async (req, res) => {
  await manage.deleteChapter(actor(res), req.params.id);
  res.status(204).end();
};

export const getQuiz: RequestHandler = async (req, res) => {
  res.json({ quiz: await manage.getQuizForEdit(actor(res), req.params.id) });
};
export const saveQuiz: RequestHandler = async (req, res) => {
  await manage.saveQuiz(actor(res), req.params.id, req.body);
  res.status(204).end();
};
export const deleteQuiz: RequestHandler = async (req, res) => {
  await manage.deleteQuiz(actor(res), req.params.id);
  res.status(204).end();
};