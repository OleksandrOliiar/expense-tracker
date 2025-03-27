import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getDashboardSummary } from "../actions/getDashboardData";
import DashboardOverviewClient from "./DashboardOverviewClient";

type DashboardOverviewServerProps = {
  startDate?: string;
  endDate?: string;
  date?: string;
};

const DashboardOverviewServer = async ({
  startDate,
  endDate,
  date,
}: DashboardOverviewServerProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["dashboard", "summary", { startDate, endDate, date }],
    queryFn: () => getDashboardSummary(startDate, endDate, date),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardOverviewClient />
    </HydrationBoundary>
  );
};

export default DashboardOverviewServer;