import type { RequestHandler } from "express";
import * as progressService from "../services/progress.service";

export const getHome: RequestHandler = async (_req, res) => {
  res.json(await progressService.getHome(res.locals.userId));
};

export const getChapter: RequestHandler = async (req, res) => {
  const percent = await progressService.getChapterPercent(res.locals.userId, String(req.params.chapterId));
  res.json({ percent });
};

export const saveChapter: RequestHandler = async (req, res) => {
  const result = await progressService.saveChapterPercent(
    res.locals.userId,
    String(req.params.chapterId),
    req.body.percent,
  );
  res.json(result);
};