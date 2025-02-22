import { CreateTransactionProps } from "@/db/types";
import { db } from "@/db";
import { transactions } from "@/db/schema";

export const addTransactions = async (
  transactionsValues: CreateTransactionProps[]
) => {
  try {
    await db.insert(transactions).values(transactionsValues);
  } catch (error) {
    console.log("Failed to add transactions", error);
    throw error;
  }
};
