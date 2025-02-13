import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserTransactions } from "../actions/getUserTransactions";
import TransactionsClient from "./TransactionsClient";

const TransactionsServer = async () => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["transactions", "list"],
    queryFn: () => getUserTransactions(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionsClient />
    </HydrationBoundary>
  );
};

export default TransactionsServer;
