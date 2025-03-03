import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserTransactions } from "../actions/getUserTransactions";
import TransactionsClient from "./TransactionsClient";

type TransactionsServerProps = {
  payee?: string;
};

const TransactionsServer = async ({ payee }: TransactionsServerProps) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["transactions", "list", { payee }],
    queryFn: () => getUserTransactions({ payee }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionsClient />
    </HydrationBoundary>
  );
};

export default TransactionsServer;
