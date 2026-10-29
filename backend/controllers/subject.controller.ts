import type { RequestHandler } from "express";
import * as subjectService from "../services/subject.service";

export const listMine: RequestHandler = async (_req, res) => {
  res.json({ subjects: await subjectService.listMySubjects(res.locals.userId) });
};

export const listPublic: RequestHandler = async (_req, res) => {
  res.json({ subjects: await subjectService.listPublicSubjects(res.locals.userId) });
};

export const joinByCode: RequestHandler = async (req, res) => {
  const subject = await subjectService.joinByCode(res.locals.userId, req.body.code);
  res.status(201).json({ subject });
};

export const joinPublic: RequestHandler = async (req, res) => {
  const subject = await subjectService.joinPublic(res.locals.userId, String(req.params.id));
  res.status(201).json({ subject });
};

export const leave: RequestHandler = async (req, res) => {
  await subjectService.leaveSubject(res.locals.userId, String(req.params.id));
  res.status(204).end();
};