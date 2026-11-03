import type { RequestHandler } from "express";
import * as quizService from "../services/quiz.service";

export const list: RequestHandler = async (_req, res) => {
  res.json(await quizService.listQuizzes(res.locals.userId));
};

export const getOne: RequestHandler = async (req, res) => {
  res.json({
    quiz: await quizService.getQuiz(res.locals.userId, res.locals.role, String(req.params.quizId)),
  });
};

export const submit: RequestHandler = async (req, res) => {
  const result = await quizService.submitQuiz(
    res.locals.userId,
    res.locals.role,
    String(req.params.quizId),
    req.body.answers,
  );
  res.status(201).json({ result });
};
