import type { RequestHandler } from "express";

export const requireRole =
  (...roles: string[]): RequestHandler =>
  (_req, res, next) => {
    if (!roles.includes(res.locals.role)) {
      res.status(403).json({ message: "You don't have permission to do that" });
      return;
    }
    next();
  };