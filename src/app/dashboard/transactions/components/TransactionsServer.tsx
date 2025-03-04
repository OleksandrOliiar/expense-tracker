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
};

const TransactionsServer = async ({
  payee,
  endDate,
  startDate,
  categories,
}: TransactionsServerProps) => {
  console.log({ categories: categories?.split(",") });

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
      },
    ],
    queryFn: () =>
      getUserTransactions({
        payee: payee ?? null,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
        categories: categories ?? null,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionsClient />
    </HydrationBoundary>
  );
};

export default TransactionsServer;
