import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getActiveBudgets } from "../actions/getDashboardData";
import BudgetOverviewClient from "./BudgetOverviewClient";

const BudgetsOverviewServer = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["dashboard", "budgets"],
    queryFn: () => getActiveBudgets(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BudgetOverviewClient />
    </HydrationBoundary>
  );
};

export default BudgetsOverviewServer;
