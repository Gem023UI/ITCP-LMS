import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export const validate =
  (schema: ZodType): RequestHandler =>
  (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path.join(".") || "form";
        if (!errors[key]) errors[key] = issue.message;
      }
      res.status(400).json({ message: "Validation failed", errors });
      return;
    }
    req.body = result.data; // sanitized + typed
    next();
  };