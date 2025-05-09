import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2),
  icon: z.string().optional(),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
