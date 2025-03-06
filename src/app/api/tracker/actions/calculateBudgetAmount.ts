import { db } from "@/db";
import { transactions } from "@/db/schema";
import { and, eq, gte, isNull, lt, lte, sql } from "drizzle-orm";

export async function calculateBudgetAmount(
  userId: string,
  startDate: Date,
  endDate: Date,
  categoryId: string | null
) {
  const result = await db
    .select({
      total: sql<string>`COALESCE(SUM(ABS(${transactions.amount})), 0)`,
    })
    .from(transactions)
    .where(
      and(
        eq(transactions.userId, userId),
        gte(transactions.date, startDate),
        lte(transactions.date, endDate),
        lt(transactions.amount, "0"),
        categoryId
          ? eq(transactions.categoryId, categoryId)
          : isNull(transactions.categoryId)
      )
    );

  return result[0]?.total || "0";
}
