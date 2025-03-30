"use client";

import { useQuery } from "@tanstack/react-query";
import { getActiveBudgets } from "../actions/getDashboardData";
import BudgetsOverviewCard from "./BudgetsOverviewCard";

const BudgetOverviewClient = () => {
  const { data: activeBudgets } = useQuery({
    queryKey: ["dashboard", "budgets"],
    queryFn: () => getActiveBudgets(),
  })

  return (
    <BudgetsOverviewCard budgets={activeBudgets} />
  )
}

export default BudgetOverviewClient