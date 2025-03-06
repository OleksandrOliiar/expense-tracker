import { db } from "@/db";
import { transactions } from "@/db/schema";
import { and, eq, gt, gte, lte } from "drizzle-orm";

type CalculateTransactionsProps = {
  startDate: Date;
  endDate: Date;
  userId: string;
};

export const calculateCurrentAmount = async ({
  endDate,
  startDate,
  userId,
}: CalculateTransactionsProps) => {
  try {
    const userTransactions = await db
      .select()
      .from(transactions)
      .where(
        and(
          gte(transactions.date, new Date(startDate)),
          lte(transactions.date, new Date(endDate)),
          eq(transactions.userId, userId),
          gt(transactions.amount, "0")
        )
      );

    const currentAmount = userTransactions.reduce(
      (acc, transaction) => acc + Number(transaction.amount),
      0
    );

    return currentAmount.toString();
  } catch (error) {
    console.log("Failed to calculate transactions", error);
    throw error;
  }
};
