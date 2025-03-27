import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { getActiveGoals } from "../actions/getDashboardData";
import GoalsOverviewClient from "./GoalsOverviewClient";

const GoalsOverviewServer = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["dashboard", "goals"],
    queryFn: () => getActiveGoals(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GoalsOverviewClient />
    </HydrationBoundary>
  );
};

export default GoalsOverviewServer;
