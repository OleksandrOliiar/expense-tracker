import { CreateCategoryProps, CreateTransactionProps } from "@/db/types";
import { Transaction as PlaidTransaction } from "plaid";

type FormatTransactionsDataProps = {
  plaidTransactions: PlaidTransaction[];
  accountId: string;
};

const formatCategoryName = (name: string) => {
  return name.toLowerCase().replace(/_/g, " ");
};

export const formatData = ({
  plaidTransactions,
  accountId,
}: FormatTransactionsDataProps) => {
  const formattedCategories: CreateCategoryProps[] = [];
  const formattedTransactions: CreateTransactionProps[] = [];

  plaidTransactions.forEach((transaction) => {
    const detailed = transaction.personal_finance_category?.detailed!;

    formattedCategories.push({
      id: detailed,
      name: formatCategoryName(
        transaction.personal_finance_category?.primary!
      ),
      userId: accountId,
      icon: transaction.personal_finance_category_icon_url,
      plaidId: detailed,
    });

    const newTransaction = {
      id: crypto.randomUUID(),
      amount: transaction.amount.toString(),
      date: new Date(transaction.date),
      name: transaction.name,
      userId: accountId,
      categoryId: detailed,
      plaidId: transaction.transaction_id,
      accountId: transaction.account_id,
    };

    formattedTransactions.push(newTransaction);
  });



  return { formattedTransactions, formattedCategories };
};
