import type { RequestHandler } from "express";
import * as quizService from "../services/quiz.service";

export const getByChapter: RequestHandler = async (req, res) => {
  res.json({
    quiz: await quizService.getQuiz(res.locals.userId, res.locals.role, String(req.params.chapterId)),
  });
};

export const submit: RequestHandler = async (req, res) => {
  const result = await quizService.submitQuiz(
    res.locals.userId,
    res.locals.role,
    String(req.params.chapterId),
    req.body.answers,
  );
  res.status(201).json({ result });
};