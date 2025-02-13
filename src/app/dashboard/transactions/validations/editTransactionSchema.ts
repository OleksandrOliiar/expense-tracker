import { z } from "zod";
import { createTransactionSchema } from "./createTransactionSchema";

export const editTransactionSchema = createTransactionSchema.merge(
  z.object({
    id: z.string(),
  })
);

export type EditTransactionSchema = z.infer<typeof editTransactionSchema>;
