import DashboardNavigation from "./components/DashboardNavigation";
import BudgetsOverviewServer from "./components/BudgetsOverviewServer";
import CategoryBreakdownServer from "./components/CategoryBreakdownServer";
import DashboardSummaryServer from "./components/DashboardSummaryServer";
import DateFilterSection from "./components/DateFilterSection";
import GoalsOverviewServer from "./components/GoalsOverviewServer";
import MonthlyBalanceServer from "./components/MonthlyBalanceServer";
import RecentTransactionsServer from "./components/RecentTransactionsServer";
import BudgetsOverviewSkeleton from "./components/BudgetsOverviewSkeleton";
import { Suspense } from "react";
import CategoryBreakdownSkeleton from "./components/CategoryBreakdownSkeleton";
import DashboardSummarySkeleton from "./components/DashboardSummarySkeleton";
import GoalsOverviewSkeleton from "./components/GoalsOverviewSkeleton";
import MonthlyBalanceSkeleton from "./components/MonthlyBalanceSkeleton";
import RecentTransactionsSkeleton from "./components/RecentTransactionsSkeleton";

export type DashboardSearchParams = {
  startDate?: string;
  endDate?: string;
  date?: string;
  type?: "incomes" | "expenses";
};

type DashboardProps = {
  searchParams: DashboardSearchParams;
};

export default async function Page({ searchParams }: DashboardProps) {
  return (
    <div className="overflow-x-hidden">
      <header className="px-4 mb-8">
        <DashboardNavigation title="Overview" />
      </header>
      <div className="px-4">
        <div className="space-y-6">
          <DateFilterSection />
          <Suspense fallback={<DashboardSummarySkeleton />}>
            <DashboardSummaryServer searchParams={searchParams} />
          </Suspense>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Suspense fallback={<MonthlyBalanceSkeleton />}>
              <MonthlyBalanceServer searchParams={searchParams} />
            </Suspense>
            <Suspense fallback={<CategoryBreakdownSkeleton />}>
              <CategoryBreakdownServer searchParams={searchParams} />
            </Suspense>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Suspense fallback={<RecentTransactionsSkeleton />}>
              <RecentTransactionsServer />
            </Suspense>
            <div className="space-y-4">
              <Suspense fallback={<BudgetsOverviewSkeleton />}>
                <BudgetsOverviewServer />
              </Suspense>
              <Suspense fallback={<GoalsOverviewSkeleton />}>
                <GoalsOverviewServer />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
