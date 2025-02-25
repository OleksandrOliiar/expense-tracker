import { db } from "@/db";
import { goals, transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { desc, sql } from "drizzle-orm";

/**
 * Retrieves all goals for a user and calculates transaction sums by date
 * 
 * @param userId The ID of the user
 * @returns Object containing user goals and a map of transaction sums by date
 */
export async function getUserGoalsWithTransactions(userId: string) {
  // Get all goals for the user
  const userGoals = await db
    .select()
    .from(goals)
    .where(eq(goals.userId, userId));

  // Get all transactions for the user, grouped by date
  const transactionData = await db
    .select({
      date: sql<string>`DATE(${transactions.date})`,
      amount: sql<number>`SUM(${transactions.amount})`
    })
    .from(transactions)
    .where(eq(transactions.userId, userId))
    .groupBy(sql`DATE(${transactions.date})`)
    .orderBy(desc(sql`DATE(${transactions.date})`));

  // Convert to a Map for easier access in the route handler
  const transactionSums = new Map<string, number>();
  transactionData.forEach(item => {
    transactionSums.set(item.date, item.amount);
  });

  return {
    userGoals,
    transactionSums
  };
} 