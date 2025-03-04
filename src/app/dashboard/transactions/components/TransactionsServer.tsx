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
};

const TransactionsServer = async ({
  payee,
  endDate,
  startDate,
  categories,
  type,
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
      },
    ],
    queryFn: () =>
      getUserTransactions({
        payee: payee ?? null,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
        categories: categories ?? null,
        type: type ?? null,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionsClient />
    </HydrationBoundary>
  );
};

export default TransactionsServer;
