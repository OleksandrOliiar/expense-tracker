"use server";

import { auth } from "@clerk/nextjs/server";
import {
  createTransactionSchema,
  CreateTransactionSchema,
} from "../validations/createTransactionSchema";

import { transactions } from "@/db/schema";
import { db } from "@/db";

export const createTransaction = async (data: CreateTransactionSchema) => {
  const result = createTransactionSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.toString());
  }

  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const transaction = await db
      .insert(transactions)
      .values({
        amount: result.data.amount,
        payee: result.data.payee,
        notes: result.data.notes,
        date: result.data.date,
        categoryId: result.data.categoryId,
        type: result.data.type,
        id: crypto.randomUUID(),
        userId,
      })
      .returning();

    return transaction;
  } catch (error) {
    console.log("Error creating transaction", error);
    throw error;
  }
};
