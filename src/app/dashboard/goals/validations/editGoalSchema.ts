import { z } from "zod";
import { createGoalSchema } from "./createGoalSchema";

export const editGoalSchema = createGoalSchema.merge(
  z.object({
    id: z.string(),
  })
);

export type EditGoalSchema = z.infer<typeof editGoalSchema>; 