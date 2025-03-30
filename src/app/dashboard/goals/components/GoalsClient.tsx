"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getUserGoals } from "../actions/getUserGoals";
import GoalCard from "./GoalCard";
import NoGoalsMessage from "./NoGoalsMessage";
import NoSearchResults from "./NoSearchResults";

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

  if (!goals?.length && !name) return <NoGoalsMessage />;

  return (
    <>
      {goals && goals?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      ) : (
        <NoSearchResults searchQuery={name ?? ""} />
      )}
    </>
  );
};

export default GoalsClient;
