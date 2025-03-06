import { db } from "@/db";
import { transactions } from "@/db/schema";
import { and, eq, gte, lte, sql } from "drizzle-orm";

export async function calculateGoalAmount(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  const result = await db
    .select({
      total: sql<string>`COALESCE(SUM(${transactions.amount}), 0)`,
    })
    .from(transactions)
    .where(
      and(
        eq(transactions.userId, userId),
        gte(transactions.date, startDate),
        lte(transactions.date, endDate)
      )
    );

  return result[0]?.total || "0";
}
