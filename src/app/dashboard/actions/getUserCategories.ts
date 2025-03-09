"use server";

import { db } from "@/db";
import { categories, transactions } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq, sql, like, count } from "drizzle-orm";

type GetUserCategoriesWithTransactionsProps = {
  name?: string;
  page?: number;
  pageSize?: number;
};

export const getUserCategoriesWithTransactions = async ({
  name,
  page = 1,
  pageSize = 9,
}: GetUserCategoriesWithTransactionsProps) => {
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
        icon: categories.icon,
        transactionsCount: sql<number>`CAST(COUNT(${transactions.id}) AS INTEGER)`,
      })
      .from(categories)
      .leftJoin(transactions, eq(transactions.categoryId, categories.id))
      .groupBy(categories.id)
      .$dynamic();

    query.where(eq(categories.userId, user.id));

    if (name && name.trim() !== "") {
      query.where(like(categories.name, `%${name}%`));
    }

    query.limit(pageSize).offset((page - 1) * pageSize);

    const categoriesCount = db.select({ count: count() }).from(categories);

    const [data, total] = await Promise.all([query, categoriesCount]);

    return {
      data,
      totalPages: Math.ceil(total[0].count / pageSize),
    };
  } catch (error) {
    console.error("Failed to get categories", error);
    throw new Error("Failed to get categories");
  }
};
