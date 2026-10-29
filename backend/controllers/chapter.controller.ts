import type { RequestHandler } from "express";
import * as chapterService from "../services/chapter.service";
import { HttpError } from "../utils/httpError";

export const listBySubject: RequestHandler = async (req, res) => {
  const { subjectId } = req.query;
  if (typeof subjectId !== "string" || !subjectId) throw new HttpError(400, "subjectId is required");
  const chapters = await chapterService.listChapters(res.locals.userId, res.locals.role, subjectId);
  res.json({ chapters });
};

export const getOne: RequestHandler = async (req, res) => {
  const chapter = await chapterService.getChapter(res.locals.userId, res.locals.role, req.params.id);
  res.json({ chapter });
};