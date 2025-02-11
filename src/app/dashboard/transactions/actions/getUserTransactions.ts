"use server";

import { db } from "@/db";
import { transactions } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getUserTransactions = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const userTransactions = db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId));

    return userTransactions;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user transactions");
  }
};
