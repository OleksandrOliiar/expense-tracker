import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getRecentTransactions } from "../actions/getDashboardData";
import RecentTransactionClient from "./RecentTransactionClient";

const RecentTransactionsServer = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["dashboard", "recentTransactions"],
    queryFn: () => getRecentTransactions(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecentTransactionClient />
    </HydrationBoundary>
  );
};

export default RecentTransactionsServer;
