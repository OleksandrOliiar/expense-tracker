import { z } from "zod";

export const createGoalSchema = z.object({
  title: z.string().min(1, "Goal name is required"),
  targetAmount: z.number().min(1, "Target amount must be at least 1"),
  currentAmount: z.number().default(0),
  description: z.string().optional(),
  dueDate: z.date().optional(),
});

export type CreateGoalSchema = z.infer<typeof createGoalSchema>; 