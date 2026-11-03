import type { RequestHandler } from "express";
import * as dashboard from "../services/dashboard.service";

export const teacher: RequestHandler = async (_req, res) => {
  res.json(await dashboard.teacherDashboard(res.locals.userId));
};
