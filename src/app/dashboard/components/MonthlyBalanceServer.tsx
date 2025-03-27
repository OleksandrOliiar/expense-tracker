import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { DashboardSearchParams } from "../page";
import { getPeriod } from "../utils/getPeriod";
import { getMonthlyBalance } from "../actions/getDashboardData";
import MonthlyBalanceClient from "./MonthlyBalanceClient";

type MonthlyBalanceServerProps = {
  searchParams: DashboardSearchParams;
};

const MonthlyBalanceServer = async ({
  searchParams,
}: MonthlyBalanceServerProps) => {
  const queryClient = new QueryClient();

  const { currentPeriod, previousPeriod } = getPeriod(searchParams);

  await queryClient.prefetchQuery({
    queryKey: ["dashboard", "monthlyBalance"],
    queryFn: () => getMonthlyBalance(currentPeriod, previousPeriod),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MonthlyBalanceClient />
    </HydrationBoundary>
  );
};

export default MonthlyBalanceServer;
