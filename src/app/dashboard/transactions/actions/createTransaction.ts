"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  createTransactionSchema,
  CreateTransactionSchema,
} from "../validations/createTransactionSchema";

import { transactions } from "@/db/schema";
import { db } from "@/db";
import { qstashClient } from "@/lib/qstash";

export const createTransaction = async (data: CreateTransactionSchema) => {
  const result = createTransactionSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.toString());
  }

  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    const transaction = await db
      .insert(transactions)
      .values({
        amount: result.data.amount.toString(),
        notes: result.data.notes,
        date: result.data.date,
        categoryId: result.data.categoryId,
        id: crypto.randomUUID(),
        userId: user.id,
      })
      .returning();

    await qstashClient.publishJSON({
      url: `${process.env.APP_URL}/api/tracker`,
      body: {
        transactionId: transaction[0].id,
        userId: user.id,
        type: "create",
      },
    });

    return transaction;
  } catch (error) {
    console.log("Error creating transaction", error);
    throw error;
  }
};
