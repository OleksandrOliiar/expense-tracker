"use client";

import { useQuery } from "@tanstack/react-query";
import { usePeriod } from "../hooks/usePeriod";
import { getMonthlyBalance } from "../actions/getDashboardData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MonthlyBalanceChart from "./MonthlyBalanceChart";

const MonthlyBalanceClient = () => {
  const { currentPeriod, previousPeriod } = usePeriod();

  const { data: monthlyBalance } = useQuery({
    queryKey: ["dashboard", "monthlyBalance"],
    queryFn: () => getMonthlyBalance(currentPeriod, previousPeriod),
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Period Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        {monthlyBalance ? (
          <MonthlyBalanceChart data={monthlyBalance} />
        ) : (
          <div className="h-[300px] w-full flex items-center justify-center">
            <p className="text-center py-4 text-muted-foreground">
              No data available
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlyBalanceClient;
