import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getMonthlyBalance } from "../actions/getDashboardData";
import { DashboardSearchParams } from "../page";
import { getPeriod } from "../utils/getPeriod";
import DashboardSummaryClient from "./DashboardSummaryClient";

type DashboardSummaryServerProps = {
  searchParams: DashboardSearchParams;
};

const DashboardSummaryServer = async ({
  searchParams,
}: DashboardSummaryServerProps) => {
  const queryClient = new QueryClient();

  const { currentPeriod, previousPeriod } = getPeriod(searchParams);

  await queryClient.prefetchQuery({
    queryKey: ["dashboard", "monthlyBalance"],
    queryFn: () => getMonthlyBalance(currentPeriod, previousPeriod),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardSummaryClient />
    </HydrationBoundary>
  );
};

export default DashboardSummaryServer;
