"use server";

import { db } from "@/db";
import { categories, transactions } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq, ilike } from "drizzle-orm";

type GetUserTransactionsProps = {
  payee?: string;
};

export const getUserTransactions = async ({
  payee,
}: GetUserTransactionsProps) => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    const query = db
      .select({
        id: transactions.id,
        amount: transactions.amount,
        payee: transactions.payee,
        notes: transactions.notes,
        date: transactions.date,
        category: {
          name: categories.name,
          id: categories.id,
        },
      })
      .from(transactions)
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .groupBy(categories.id, transactions.id)
      .$dynamic();

    query.where(eq(transactions.userId, user.id));

    if (payee && payee.trim() !== "") {
      query.where(ilike(transactions.payee, `%${payee}%`));
    }

    return await query;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user transactions");
  }
};
