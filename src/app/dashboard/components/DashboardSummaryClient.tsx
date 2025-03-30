"use client";

import { useQuery } from "@tanstack/react-query";
import { getMonthlyBalance } from "../actions/getDashboardData";
import { usePeriod } from "../hooks/usePeriod";
import SummaryCard from "./SummaryCard";

const DashboardSummaryClient = () => {
  const { currentPeriod, previousPeriod } = usePeriod();

  const { data: monthlyBalance } = useQuery({
    queryKey: ["dashboard", "monthlyBalance"],
    queryFn: () => getMonthlyBalance(currentPeriod, previousPeriod),
  });


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <SummaryCard
        title="Income"
        value={monthlyBalance?.currentMonth.income ?? "0"}
        previousValue={monthlyBalance?.previousMonth.income ?? "0"}
        percentageChange={monthlyBalance?.changes.income ?? 0}
        isPositiveGood={true}
      />
      <SummaryCard
        title="Expenses"
        value={monthlyBalance?.currentMonth.expenses ?? "0"}
        previousValue={monthlyBalance?.previousMonth.expenses ?? "0"}
        percentageChange={monthlyBalance?.changes.expenses ?? 0}
        isPositiveGood={false}
      />
      <SummaryCard
        title="Balance"
        value={monthlyBalance?.currentMonth.balance ?? "0"}
        previousValue={monthlyBalance?.previousMonth.balance ?? "0"}
        percentageChange={monthlyBalance?.changes.balance ?? 0}
        isPositiveGood={true}
        className="sm:col-span-2 lg:col-span-1"
      />
    </div>
  );
};

export default DashboardSummaryClient;
