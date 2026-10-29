import type { RequestHandler } from "express";
import * as admin from "../services/admin.service";

export const listUsers: RequestHandler = async (req, res) => {
  const { role } = req.query;
  const filter = role === "TEACHER" || role === "STUDENT" ? role : undefined;
  res.json({ users: await admin.listUsers(filter) });
};

export const setStatus: RequestHandler = async (req, res) => {
  const user = await admin.setUserStatus(res.locals.userId, req.params.id, req.body.status);
  res.json({ user });
};