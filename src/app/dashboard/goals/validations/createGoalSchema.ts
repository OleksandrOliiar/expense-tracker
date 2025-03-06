import { z } from "zod";

export const createGoalSchema = z
  .object({
    title: z.string().min(1, "Goal name is required"),
    targetAmount: z.number().min(1, "Target amount must not be 0"),
    description: z.string().optional(),
    endDate: z.date(),
    startDate: z.date(),
  })

export type CreateGoalSchema = z.infer<typeof createGoalSchema>;
