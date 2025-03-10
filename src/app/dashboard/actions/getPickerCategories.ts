"use server";

import { db } from "@/db";
import { categories, transactions } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq, like, sql } from "drizzle-orm";

export const getPickerCategories = async (name?: string) => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("User not found");
    }

    const user = await getUser();

    const query = db
      .select({
        id: categories.id,
        name: categories.name,
        icon: categories.icon,
        transactionsCount: sql<number>`CAST(COUNT(${transactions.id}) AS INTEGER)`,
      })
      .from(categories)
      .limit(10)
      .where(eq(categories.userId, user.id))
      .leftJoin(transactions, eq(transactions.categoryId, categories.id))
      .groupBy(categories.id)
      .$dynamic();

    if (name && name.trim() !== "") {
      query.where(like(categories.name, `%${name}%`));
    }

    const result = await query;

    return result;
  } catch (error) {
    console.log("Failed to get categories", error);
    throw new Error("Failed to get categories");
  }
};
