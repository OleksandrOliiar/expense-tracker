"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategorySpending } from "../actions/getDashboardData";
import { usePeriod } from "../hooks/usePeriod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryBreakdownChart from "./CategoryBreakdownChart";

const CategoryBreakdownClient = () => {
  const { currentPeriod } = usePeriod();

  const {
    data: categorySpending,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard", "categorySpending"],
    queryFn: () => getCategorySpending(currentPeriod),
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <CategoryBreakdownChart data={categorySpending} />
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdownClient;
