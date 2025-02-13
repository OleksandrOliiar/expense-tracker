"use server";

import { transactions } from "@/db/schema";
import {
  editTransactionSchema,
  EditTransactionSchema,
} from "../validations/editTransactionSchema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
export const editTransaction = async (data: EditTransactionSchema) => {
  const result = editTransactionSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  const { id, ...rest } = result.data;

  try {
    const result = await db
      .update(transactions)
      .set(rest)
      .where(eq(transactions.id, id));

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to edit transaction");
  }
};
