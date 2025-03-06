"use server";

import { db } from "@/db";
import { categories, transactions } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq, gte, ilike, inArray, lte } from "drizzle-orm";

type GetUserTransactionsProps = {
  name: string | null;
  startDate: string | null;
  endDate: string | null;
  categories: string | null;
  type: "all" | "income" | "expense" | null;
  date: string | null;
};

export const getUserTransactions = async ({
  name,
  startDate,
  endDate,
  categories: categoriesString,
  type,
  date,
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
        name: transactions.name,
        date: transactions.date,
        category: {
          name: categories.name,
          id: categories.id,
          icon: categories.icon,
        },
      })
      .from(transactions)
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .groupBy(categories.id, transactions.id)
      .$dynamic();

    query.where(eq(transactions.userId, user.id));

    if (name && name.trim() !== "") {
      query.where(ilike(transactions.name, `%${name}%`));
    }

    if (startDate) {
      query.where(gte(transactions.date, new Date(startDate)));
    }

    if (endDate) {
      query.where(lte(transactions.date, new Date(endDate)));
    }

    if (categoriesString) {
      const categoriesArr = categoriesString.split(",");
      query.where(inArray(transactions.categoryId, categoriesArr));
    }

    if (type && type === "expense") {
      query.where(lte(transactions.amount, "0"));
    } else if (type && type === "income") {
      query.where(gte(transactions.amount, "0"));
    }

    if (date) {
      query.where(eq(transactions.date, new Date(date)));
    }

    const result = await query;

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user transactions");
  }
};
