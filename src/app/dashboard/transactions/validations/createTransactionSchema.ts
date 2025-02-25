import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z.number(),
  payee: z.string().min(1),
  notes: z.string().optional(),
  date: z.date(),
  categoryId: z.string().optional(),
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;