"use client";

import { useQuery } from "@tanstack/react-query";
import { usePeriod } from "../hooks/usePeriod";
import { getMonthlyBalance } from "../actions/getDashboardData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MonthlyBalanceChart from "./MonthlyBalanceChart";

const MonthlyBalanceClient = () => {
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
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Period Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <MonthlyBalanceChart data={monthlyBalance} />
      </CardContent>
    </Card>
  );
};

export default MonthlyBalanceClient;
