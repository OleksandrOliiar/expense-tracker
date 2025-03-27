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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!categorySpending || categorySpending.length === 0) {
    return <div>No category spending data available</div>;
  }

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
