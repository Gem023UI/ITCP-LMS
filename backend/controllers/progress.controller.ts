import type { RequestHandler } from "express";
import * as progressService from "../services/progress.service";

export const getHome: RequestHandler = async (_req, res) => {
  res.json(await progressService.getHome(res.locals.userId));
};

// reading position + whether the chapter is marked complete
export const getChapter: RequestHandler = async (req, res) => {
  res.json(await progressService.getChapterProgress(res.locals.userId, String(req.params.chapterId)));
};

export const saveChapter: RequestHandler = async (req, res) => {
  res.json(
    await progressService.saveChapterPercent(
      res.locals.userId,
      String(req.params.chapterId),
      req.body.percent,
    ),
  );
};

export const completeChapter: RequestHandler = async (req, res) => {
  res.json(await progressService.completeChapter(res.locals.userId, String(req.params.chapterId)));
};

export const quizStats: RequestHandler = async (_req, res) => {
  res.json(await progressService.getQuizStats(res.locals.userId));
};
