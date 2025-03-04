import { z } from "zod";
import { createCategorySchema } from "./createCategorySchema";

export const editCategorySchema = createCategorySchema.extend({
  id: z.string(),
});

export type EditCategorySchema = z.infer<typeof editCategorySchema>;
