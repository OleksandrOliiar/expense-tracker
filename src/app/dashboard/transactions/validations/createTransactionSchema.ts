import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z.number().min(1),
  payee: z.string().min(1),
  notes: z.string().optional(),
  date: z.date(),
  categoryId: z.string().optional(),
  type: z.enum(["income", "expense"]),
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;