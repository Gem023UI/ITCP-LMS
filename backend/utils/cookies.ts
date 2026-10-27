import type { CookieOptions } from "express";
import { env } from "./env";

export const COOKIE_NAME = "lms_token";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000, // keep in step with JWT_EXPIRES_IN
  path: "/",
};