import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserBudgets } from "../actions/getUserBudgets";
import BudgetsClient from "./BudgetsClient";

const BudgetsServer = async ({ name }: { name?: string }) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["budgets", "list", name],
    queryFn: () => getUserBudgets(name),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BudgetsClient />
    </HydrationBoundary>
  );
};

export default BudgetsServer;
