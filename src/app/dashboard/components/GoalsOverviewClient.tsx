"use client";

import { useQuery } from "@tanstack/react-query";
import { getActiveGoals } from "../actions/getDashboardData";
import GoalsOverviewCard from "./GoalsOverviewCard";

const GoalsOverviewClient = () => {
  const {
    data: activeGoals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard", "goals"],
    queryFn: () => getActiveGoals(),
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!activeGoals || activeGoals.length === 0) {
    return <div>No goals found</div>;
  }

  return <GoalsOverviewCard goals={activeGoals} />
};

export default GoalsOverviewClient;
