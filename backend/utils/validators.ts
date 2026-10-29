import { z } from "zod";

// strips control characters (null bytes, etc.)
const clean = (s: string) => s.replace(/[\u0000-\u001F\u007F]/g, "");

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const TUPT_ID_RE = /^TUPT-\d{2}-\d{4}$/;

const tuptId = z
  .string({ error: "TUPT ID is required" })
  .transform((s) => clean(s).trim().toUpperCase())
  .pipe(
    z
      .string()
      .min(1, "TUPT ID is required")
      .regex(TUPT_ID_RE, "Use the format TUPT-XX-XXXX"),
  );

const email = z
  .string({ error: "Email is required" })
  .transform((s) => clean(s).trim().toLowerCase())
  .pipe(
    z
      .string()
      .min(1, "Email is required")
      .max(254, "Email is too long")
      .regex(EMAIL_RE, "Enter a valid email address"),
  );

// bcrypt only uses the first 72 bytes, so cap it
const password = z
  .string({ error: "Password is required" })
  .min(8, "At least 8 characters")
  .regex(/[A-Z]/, "At least 1 uppercase letter")
  .regex(/[^A-Za-z0-9\s]/, "At least 1 special character")
  .refine((p) => Buffer.byteLength(p, "utf8") <= 72, "Password is too long");

export const registerSchema = z
  .strictObject({
    tuptId,
    email,
    password,
    confirmPassword: z.string({ error: "Confirm your password" }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const loginSchema = z.strictObject({
  tuptId,
  password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required")
    .max(72, "Password is too long"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;