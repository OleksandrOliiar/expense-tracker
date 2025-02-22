import { CreateTransactionProps } from "@/db/types";
import { Transaction as PlaidTransaction } from "plaid";

type FormatTransactionsDataProps = {
  plaidTransactions: PlaidTransaction[];
  accountId: string;
};

export const formatTransactionsData = ({
  plaidTransactions,
  accountId,
}: FormatTransactionsDataProps): CreateTransactionProps[] => {
  return plaidTransactions.map((transaction) => {
    return {
      id: crypto.randomUUID(),
      amount: transaction.amount,
      date: new Date(transaction.date),
      payee: transaction.name,
      type: transaction.amount < 0 ? "expense" : "income",
      userId: accountId,
    };
  });
};
