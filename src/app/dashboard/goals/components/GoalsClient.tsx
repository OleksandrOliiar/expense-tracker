"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserGoals } from "../actions/getUserGoals";
import GoalCard from "./GoalCard";
import { useSearchParams } from "next/navigation";

const GoalsClient = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? undefined;

  const {
    data: goals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["goals", "list", name],
    queryFn: () => getUserGoals(name),
  });

  if (isLoading) return <div>Loading goals...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!goals?.length)
    return <div>No goals found. Create your first goal to get started!</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
};

export default GoalsClient;
