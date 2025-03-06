import { db } from "@/db";
import { transactions } from "@/db/schema";
import { and, eq, gte, lt, lte } from "drizzle-orm";

type CalculateTransactionsProps = {
  startDate: Date;
  endDate: Date;
  categoryId?: string;
  userId: string;
};

export const calculateCurrentAmount = async (
  props: CalculateTransactionsProps
) => {
  try {
    const userTransactions = await db
      .select()
      .from(transactions)
      .where(
        and(
          gte(transactions.date, new Date(props.startDate)),
          lte(transactions.date, new Date(props.endDate)),
          eq(transactions.userId, props.userId),
          props.categoryId
            ? eq(transactions.categoryId, props.categoryId)
            : undefined,
          lt(transactions.amount, "0")
        )
      );

    const currentAmount = userTransactions.reduce(
      (acc, transaction) => acc + Number(transaction.amount),
      0
    );

    return (-currentAmount).toString();
  } catch (error) {
    console.log("Failed to calculate transactions", error);
    throw error;
  }
};
