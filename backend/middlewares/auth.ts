import type { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";
import { COOKIE_NAME } from "../utils/cookies";

export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }
  try {
    const payload = verifyToken(token);
    res.locals.userId = payload.sub;
    res.locals.role = payload.role;
    next();
  } catch {
    res.status(401).json({ message: "Session expired" });
  }
};