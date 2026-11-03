import type { RequestHandler } from "express";
import * as admin from "../services/admin.service";

export const listUsers: RequestHandler = async (req, res) => {
  const { role } = req.query;
  const filter = role === "TEACHER" || role === "STUDENT" ? role : undefined;
  res.json({ users: await admin.listUsers(filter) });
};

export const setStatus: RequestHandler = async (req, res) => {
const user = await admin.setUserStatus(res.locals.userId, String(req.params.id), req.body.status);  res.json({ user });
};

export const listSubjects: RequestHandler = async (_req, res) => {
  res.json({ subjects: await admin.listAllSubjects() });
};

export const listSubjectChapters: RequestHandler = async (req, res) => {
  res.json({ chapters: await admin.listSubjectChapterCards(String(req.params.id)) });
};