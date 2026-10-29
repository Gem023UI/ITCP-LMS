import { z } from "zod";

const httpUrl = z
  .string({ error: "URL is required" })
  .trim()
  .max(2000)
  .refine((u) => /^https?:\/\/\S+$/i.test(u), "Enter a valid http(s) URL");

const text = (label: string, max = 5000) =>
  z.string({ error: `${label} is required` }).trim().min(1, `${label} is required`).max(max);

export const subjectInputSchema = z.strictObject({
  title: text("Title", 120),
  description: text("Description", 1000),
  mediaUrl: httpUrl, // direct video file or YouTube embed link
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
});

export const chapterInputSchema = z.strictObject({
  chapterId: text("Chapter ID", 60),
  chapterNo: z.number({ error: "Chapter number is required" }).int().positive().max(999),
  cardImage: text("Card image", 2000),
  title: text("Title", 200),
  description: text("Description"),
  durationMinutes: z.number({ error: "Duration is required" }).int().positive().max(100000),
  videoUrl: httpUrl,
  slideUrl: httpUrl,
  objectives: z.array(z.strictObject({ objective: text("Objective") })).min(1, "Add at least one objective"),
  sections: z
    .array(
      z.strictObject({
        sectionNo: text("sectionNo", 60),
        header: text("header", 300),
        imageUrl: z.array(z.strictObject({ url: text("url", 4000) })),
        imageSource: z.array(z.strictObject({ source: z.string().max(500) })),
        content: z.array(z.strictObject({ paragraph: text("paragraph") })).min(1),
      }),
    )
    .min(1, "Add at least one section"),
  keyTerms: z.array(
    z.strictObject({ word: text("word", 200), definition: text("definition"), source: z.string().max(500) }),
  ),
  references: z.array(z.strictObject({ author: text("author", 500), link: z.string().max(2000) })),
});

const quizQuestionInput = z
  .object({
    type: z.enum(["multiple_choice", "identification"]),
    question: text("Question", 1000),
    choices: z.array(z.string().trim().max(500)).max(10),
    correctAnswer: text("Correct answer", 500),
  })
  .transform((q) =>
    q.type === "identification"
      ? { ...q, choices: [] as string[], correctAnswer: q.correctAnswer.replace(/\s+/g, " ").toUpperCase() }
      : { ...q, choices: q.choices.filter(Boolean) },
  )
  .refine(
    (q) =>
      q.type === "identification" ||
      (q.choices.length >= 2 &&
        new Set(q.choices.map((c) => c.toUpperCase())).size === q.choices.length &&
        q.choices.includes(q.correctAnswer)),
    "Multiple choice needs 2+ unique choices, and the correct answer must be one of them",
  );

export const quizInputSchema = z.strictObject({
  questions: z.array(quizQuestionInput).min(1, "Add at least one question").max(100),
});

export const setStatusSchema = z.strictObject({
  status: z.enum(["ACTIVE", "INACTIVE", "DEACTIVATED"]),
});

export type SubjectInput = z.infer<typeof subjectInputSchema>;
export type ChapterInput = z.infer<typeof chapterInputSchema>;
export type QuizInput = z.infer<typeof quizInputSchema>;