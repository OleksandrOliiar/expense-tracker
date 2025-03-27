"use client";

import { useQuery } from "@tanstack/react-query";
import { getMonthlyBalance } from "../actions/getDashboardData";
import { usePeriod } from "../hooks/usePeriod";
import SummaryCard from "./SummaryCard";

const DashboardSummaryClient = () => {
  const { currentPeriod, previousPeriod } = usePeriod();

  const {
    data: monthlyBalance,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["dashboard", "monthlyBalance"],
    queryFn: () => getMonthlyBalance(currentPeriod, previousPeriod),
  });

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!monthlyBalance) return <div>No data available</div>;

  return (
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
  );
};

export default DashboardSummaryClient;
