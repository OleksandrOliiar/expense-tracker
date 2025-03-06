import { z } from "zod";

export const createTransactionSchema = z
  .object({
    amount: z.number({
      required_error: "Amount is required",
    }),
    name: z.string().min(1, { message: "Name is required" }),
    date: z.date({
      required_error: "Date is required",
    }),
    categoryId: z.string().optional().nullable(),
  })

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
