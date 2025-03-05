import { z } from "zod";
import { createBudgetSchema } from "./createBudgetSchema";

export const editBudgetSchema = createBudgetSchema.merge(
  z.object({
    id: z.string(),
  })
);

export type EditBudgetSchema = z.infer<typeof editBudgetSchema>;
