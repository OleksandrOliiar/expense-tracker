import { z } from "zod";

export const createTransactionSchema = z
  .object({
    amount: z.number({
      required_error: "Amount is required",
    }),
    payee: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    date: z.date({
      required_error: "Date is required",
    }),
    categoryId: z.string().optional().nullable(),
  })
  .refine(
    (data) => {
      return data.amount !== 0;
    },
    {
      message: "Amount cannot be 0",
      path: ["amount"],
    }
  );

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
