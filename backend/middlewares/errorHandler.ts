import type { ErrorRequestHandler, RequestHandler } from "express";
import { AuthError } from "../services/auth.service";

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ message: "Not found" });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AuthError) {
    res.status(err.status).json({ message: err.message, errors: err.errors });
    return;
  }
  if (err?.type === "entity.parse.failed") {
    res.status(400).json({ message: "Malformed JSON body" });
    return;
  }
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
};