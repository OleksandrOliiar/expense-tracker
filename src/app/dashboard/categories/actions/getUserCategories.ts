"use server";

import { db } from "@/db";
import { categories, transactions } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq, sql } from "drizzle-orm";

export const getUserCategories = async () => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    const userCategories = await db
      .select({
        id: categories.id,
        name: categories.name,
        userId: categories.userId,
        plaidId: categories.plaidId,
        createdAt: categories.createdAt,
        updatedAt: categories.updatedAt,
        transactionsCount: sql<number>`CAST(COUNT(${transactions.id}) AS INTEGER)`,
      })
      .from(categories)
      .leftJoin(transactions, eq(transactions.categoryId, categories.id))
      .where(eq(categories.userId, user.id))
      .groupBy(categories.id);

    return userCategories;
  } catch (error) {
    console.error("Failed to get categories", error);
    throw new Error("Failed to get categories");
  }
};

