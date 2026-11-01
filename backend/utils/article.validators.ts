import { z } from "zod";

const httpUrl = z
  .string({ error: "URL is required" })
  .trim()
  .max(2000)
  .refine((u) => /^https?:\/\/\S+$/i.test(u), "Enter a valid http(s) URL");

const text = (label: string, max: number) =>
  z.string({ error: `${label} is required` }).trim().min(1, `${label} is required`).max(max);

export const articleSectionSchema = z.strictObject({
  header: text("Section header", 200),
  imageUrl: httpUrl.nullish().transform((v) => v ?? null), // section image is optional
  content: text("Section content", 10000),
});

export const articleInputSchema = z.strictObject({
  title: text("Title", 200),
  coverImageUrl: httpUrl, // article picture
  sections: z.array(articleSectionSchema).min(1, "Add at least one section").max(30),
});

export const listArticlesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  sort: z.enum(["latest", "popular"]).default("latest"),
  authorId: z.string().min(1).max(100).optional(), // e.g. "my articles" on the profile page
});

// shape stored in articles.sections (also what the seeder writes)
export const storedSectionsSchema = z.array(
  z.object({
    header: z.string(),
    imageUrl: z.string().nullable(),
    content: z.string(),
  }),
);

export type ArticleInput = z.infer<typeof articleInputSchema>;
export type ListArticlesQuery = z.infer<typeof listArticlesQuerySchema>;