import type { RequestHandler } from "express";
import * as authService from "../services/auth.service";
import { signToken } from "../utils/jwt";
import { COOKIE_NAME, cookieOptions } from "../utils/cookies";

export const register: RequestHandler = async (req, res) => {
  const { tuptId, email, password } = req.body;
  const user = await authService.registerUser(tuptId, email, password);
  res.cookie(COOKIE_NAME, signToken({ sub: user.id, role: user.role }), cookieOptions);
  res.status(201).json({ user });
};

export const login: RequestHandler = async (req, res) => {
  const { tuptId, email, password } = req.body;
  const user = await authService.loginUser(tuptId, password);
  res.cookie(COOKIE_NAME, signToken({ sub: user.id, role: user.role }), cookieOptions);
  res.json({ user });
};

export const logout: RequestHandler = (_req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: undefined });
  res.status(204).end();
};

export const me: RequestHandler = async (_req, res) => {
  const user = await authService.getUserById(res.locals.userId);
  res.json({ user });
};