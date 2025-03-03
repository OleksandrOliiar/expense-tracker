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
};

const TransactionsServer = async ({
  payee,
  endDate,
  startDate,
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
      },
    ],
    queryFn: () =>
      getUserTransactions({
        payee: payee ?? null,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionsClient />
    </HydrationBoundary>
  );
};

export default TransactionsServer;
