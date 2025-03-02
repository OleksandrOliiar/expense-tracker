import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z.number(),
  notes: z.string().optional(),
  date: z.date(),
  categoryId: z.string().optional(),
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;