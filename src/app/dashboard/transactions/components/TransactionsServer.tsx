import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserTransactions } from "../actions/getUserTransactions";
import TransactionsClient from "./TransactionsClient";

type TransactionsServerProps = {
  payee?: string;
  startDate?: string;
  endDate?: string;
  categories?: string;
  type?: "income" | "expense" | "all";
  date?: string;
};

const TransactionsServer = async ({
  payee,
  endDate,
  startDate,
  categories,
  type,
  date,
}: TransactionsServerProps) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: [
      "transactions",
      "list",
      {
        payee: payee ?? null,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
        categories: categories ?? null,
        type: type ?? null,
        date: date ?? null,
      },
    ],
    queryFn: () =>
      getUserTransactions({
        payee: payee ?? null,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
        categories: categories ?? null,
        type: type ?? null,
        date: date ?? null,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionsClient />
    </HydrationBoundary>
  );
};

export default TransactionsServer;
