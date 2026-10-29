import type { RequestHandler } from "express";
import { prisma } from "../utils/prisma";

const MESSAGES = {
  INACTIVE: "Your account is inactive. Please contact your administrator.",
  DEACTIVATED: "Your account has been deactivated.",
} as const;

/** Runs after requireAuth. The DB is the source of truth for status and role, not the JWT. */
export const requireActive: RequestHandler = async (_req, res, next) => {
  const user = await prisma.user.findUnique({
    where: { id: res.locals.userId },
    select: { role: true, status: true },
  });
  if (!user) {
    res.status(401).json({ message: "Session expired" });
    return;
  }
  if (user.status !== "ACTIVE") {
    res.status(403).json({ message: MESSAGES[user.status] });
    return;
  }
  res.locals.role = user.role;
  next();
};