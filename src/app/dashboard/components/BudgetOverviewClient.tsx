"use client";

import { useQuery } from "@tanstack/react-query";
import { getActiveBudgets } from "../actions/getDashboardData";
import BudgetsOverviewCard from "./BudgetsOverviewCard";

const BudgetOverviewClient = () => {
  const { data: activeBudgets, isLoading, error } = useQuery({
    queryKey: ["dashboard", "budgets"],
    queryFn: () => getActiveBudgets(),
  })

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!activeBudgets || activeBudgets.length === 0) {
    return <div>No active budgets</div>;
  }

  return (
    <BudgetsOverviewCard budgets={activeBudgets} />
  )
}

export default BudgetOverviewClient