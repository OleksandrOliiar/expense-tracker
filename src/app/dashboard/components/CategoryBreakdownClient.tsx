"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategorySpending } from "../actions/getDashboardData";
import { usePeriod } from "../hooks/usePeriod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryBreakdownChart from "./CategoryBreakdownChart";
import TypeFilter from "./TypeFilter";
import { useState } from "react";
import CategoryBreakdownSkeleton from "./CategoryBreakdownSkeleton";

const CategoryBreakdownClient = () => {
  const { currentPeriod } = usePeriod();
  const [type, setType] = useState<"incomes" | "expenses">("incomes");

  const { data: categorySpending, isLoading } = useQuery({
    queryKey: ["dashboard", "categorySpending", type],
    queryFn: () => getCategorySpending(currentPeriod, type),
  });

  if (isLoading) {
    return <CategoryBreakdownSkeleton/>
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2 mb-4">
          <CardTitle className="text-base">Category Breakdown</CardTitle>
          <TypeFilter value={type} onChange={setType} />
        </div>
      </CardHeader>
      <CardContent>
        <CategoryBreakdownChart data={categorySpending} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdownClient;
