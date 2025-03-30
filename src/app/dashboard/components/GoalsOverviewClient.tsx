"use client";

import { useQuery } from "@tanstack/react-query";
import { getActiveGoals } from "../actions/getDashboardData";
import GoalsOverviewCard from "./GoalsOverviewCard";

const GoalsOverviewClient = () => {
  const {
    data: activeGoals,
  } = useQuery({
    queryKey: ["dashboard", "goals"],
    queryFn: () => getActiveGoals(),
  });

  return <GoalsOverviewCard goals={activeGoals} />
};

export default GoalsOverviewClient;
