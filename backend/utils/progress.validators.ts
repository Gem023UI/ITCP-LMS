import { z } from "zod";

export const saveProgressSchema = z.strictObject({
  percent: z.number().int().min(0).max(100),
});