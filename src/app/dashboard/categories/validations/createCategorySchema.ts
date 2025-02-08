import { z } from "zod";

const categoryTypesEnum = z.enum(["income", "expense"]);

export const createCategorySchema = z.object({
  name: z.string().min(2),
  icon: z.string().optional(),
  type: categoryTypesEnum,
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
