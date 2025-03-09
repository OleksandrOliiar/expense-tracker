import { CreateTransactionProps } from "@/db/types";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { qstashClient } from "@/lib/qstash";

export const addTransactions = async (
  transactionsValues: CreateTransactionProps[]
) => {
  try {
    const result = await db
      .insert(transactions)
      .values(transactionsValues)
      .returning()
      .onConflictDoNothing({
        target: [transactions.plaidId],
      })

    if (result.length > 0) {
      const userId = result[0].userId;
      const transactionIds = result.map((t) => t.id);

      await qstashClient.publishJSON({
        url: `${process.env.APP_URL}/api/tracker`,
        body: {
          transactionIds,
          userId,
          type: "bulk",
        },
      });
    }
  } catch (error) {
    console.log("Failed to add transactions", error);
    throw error;
  }
};
