import DashboardNavigation from "./components/DashboardNavigation";
import BudgetsOverviewServer from "./components/BudgetsOverviewServer";
import CategoryBreakdownServer from "./components/CategoryBreakdownServer";
import DashboardSummaryServer from "./components/DashboardSummaryServer";
import DateFilterSection from "./components/DateFilterSection";
import GoalsOverviewServer from "./components/GoalsOverviewServer";
import MonthlyBalanceServer from "./components/MonthlyBalanceServer";
import RecentTransactionsServer from "./components/RecentTransactionsServer";

export type DashboardSearchParams = {
  startDate?: string;
  endDate?: string;
  date?: string;
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
          <DashboardSummaryServer searchParams={searchParams} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <MonthlyBalanceServer searchParams={searchParams} />
            <CategoryBreakdownServer searchParams={searchParams} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RecentTransactionsServer />
            <div className="space-y-4">
              <BudgetsOverviewServer />
              <GoalsOverviewServer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
