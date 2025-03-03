"use server";

import { db } from "@/db";
import { categories, transactions } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq, sql, like } from "drizzle-orm";

export const getUserCategories = async (name?: string) => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    const query = db
      .select({
        id: categories.id,
        name: categories.name,
        transactionsCount: sql<number>`CAST(COUNT(${transactions.id}) AS INTEGER)`,
      })
      .from(categories)
      .leftJoin(transactions, eq(transactions.categoryId, categories.id))
      .groupBy(categories.id)
      .$dynamic();

    query.where(eq(categories.userId, user.id));

    if (name && name.trim() !== '') {
      query.where(like(categories.name, `%${name}%`));
    }

    return await query;
  } catch (error) {
    console.error("Failed to get categories", error);
    throw new Error("Failed to get categories");
  }
};