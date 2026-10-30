import { z } from "zod";

export const joinByCodeSchema = z.strictObject({
  code: z
    .string({ error: "Subject code is required" })
    .transform((s) => s.trim().toUpperCase())
    .pipe(z.string().regex(/^[A-Z0-9]{6}$/, "Subject code must be 6 characters")),
});

export const submitQuizSchema = z.strictObject({
  answers: z
    .array(
      z.strictObject({
        questionNo: z.number().int().positive(),
        answer: z.string().max(500),
      }),
    )
    .max(200),
});

export const storedQuestionSchema = z
  .object({
    questionNo: z.number().int().positive(),
    type: z.enum(["multiple_choice", "identification"]),
    question: z.string().min(1),
    choices: z.array(z.string()), // empty for identification
    correctAnswer: z.string().min(1), // choice text, or an ALL CAPS string for identification
  })
  .refine(
    (q) =>
      q.type === "identification" ||
      (q.choices.length >= 2 &&
        q.choices.some((c) => c.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase())),
    { message: "correctAnswer must match one of the choices" },
  );

export const storedQuestionsSchema = z.array(storedQuestionSchema).min(1);
export const storedAnswersSchema = z.array(
  z.object({ questionNo: z.number().int(), answer: z.string() }),
);

export type StoredQuestion = z.infer<typeof storedQuestionSchema>;
export type SubmittedAnswer = z.infer<typeof storedAnswersSchema>[number];