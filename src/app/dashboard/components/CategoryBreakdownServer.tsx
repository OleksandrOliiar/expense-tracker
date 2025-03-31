import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getCategorySpending } from "../actions/getDashboardData";
import { DashboardSearchParams } from "../page";
import { getPeriod } from "../utils/getPeriod";
import CategoryBreakdownClient from "./CategoryBreakdownClient";

type CategoryBreakdownServerProps = {
  searchParams: DashboardSearchParams;
};

const CategoryBreakdownServer = async ({
  searchParams,
}: CategoryBreakdownServerProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["dashboard", "categorySpending", "incomes"],
    queryFn: () =>
      getCategorySpending(getPeriod(searchParams).currentPeriod, "incomes"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryBreakdownClient  />
    </HydrationBoundary>
  );
};

export default CategoryBreakdownServer;
