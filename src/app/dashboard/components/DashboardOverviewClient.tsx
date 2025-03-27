"use client";

import DateFilter from "@/app/dashboard/transactions/components/DateFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { getDashboardSummary } from "../actions/getDashboardData";
import BudgetsOverviewCard from "./BudgetsOverviewCard";
import CategoryBreakdownChart from "./CategoryBreakdownChart";
import DashboardSkeleton from "./DashboardSkeleton";
import GoalsOverviewCard from "./GoalsOverviewCard";
import MonthlyBalanceChart from "./MonthlyBalanceChart";
import RecentTransactionsCard from "./RecentTransactionsCard";
import SummaryCard from "./SummaryCard";

const DashboardOverviewClient = () => {
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate") ?? undefined;
  const endDate = searchParams.get("endDate") ?? undefined;
  const date = searchParams.get("date") ?? undefined;

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard", "summary", { startDate, endDate, date }],
    queryFn: () => getDashboardSummary(startDate, endDate, date),
  });

  if (isLoading) return <DashboardSkeleton />;
  if (error)
    return (
      <div className="text-center p-6 text-destructive">
        Error: {error.message}
      </div>
    );
  if (!data)
    return (
      <div className="text-center p-6 text-muted-foreground">
        No data available
      </div>
    );

  const {
    recentTransactions,
    monthlyBalance,
    categorySpending,
    activeBudgets,
    activeGoals,
    period,
  } = data;

  return (
    <div className="space-y-6">
      {/* Date Filter Section */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold tracking-tight">
                  Financial Summary
                </h2>
              </div>
              <p className="text-sm font-medium text-foreground">
                {period.current.startDate} to {period.current.endDate}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Compared to {period.previous.startDate} to{" "}
                {period.previous.endDate}
              </p>
            </div>
            <DateFilter className="w-full sm:w-auto max-w-[280px]" />
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryCard
          title="Income"
          value={monthlyBalance.currentMonth.income}
          previousValue={monthlyBalance.previousMonth.income}
          percentageChange={monthlyBalance.changes.income}
          isPositiveGood={true}
        />
        <SummaryCard
          title="Expenses"
          value={monthlyBalance.currentMonth.expenses}
          previousValue={monthlyBalance.previousMonth.expenses}
          percentageChange={monthlyBalance.changes.expenses}
          isPositiveGood={false}
        />
        <SummaryCard
          title="Balance"
          value={monthlyBalance.currentMonth.balance}
          previousValue={monthlyBalance.previousMonth.balance}
          percentageChange={monthlyBalance.changes.balance}
          isPositiveGood={true}
          className="sm:col-span-2 lg:col-span-1"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Period Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyBalanceChart data={monthlyBalance} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryBreakdownChart data={categorySpending} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentTransactionsCard transactions={recentTransactions} />
        <div className="space-y-4">
          <BudgetsOverviewCard budgets={activeBudgets} />
          <GoalsOverviewCard goals={activeGoals} />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverviewClient;
