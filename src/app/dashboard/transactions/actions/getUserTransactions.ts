"use server";

import { db } from "@/db";
import { transactions } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

export const getUserTransactions = async () => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    const userTransactions = db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, user.id));

    return userTransactions;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user transactions");
  }
};
