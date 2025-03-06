import { z } from "zod";

export const createBudgetSchema = z
  .object({
    title: z.string().min(1, "Budget name is required"),
    targetAmount: z.number().min(1, "Target amount must not be 0"),
    description: z.string().optional(),
    endDate: z.date(),
    startDate: z.date(),
    categoryId: z.string().optional(),
  })

export type CreateBudgetSchema = z.infer<typeof createBudgetSchema>;
