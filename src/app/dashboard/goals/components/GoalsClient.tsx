"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserGoals } from "../actions/getUserGoals";
import GoalCard from "./GoalCard";
import { useSearchParams } from "next/navigation";
import GoalCardSkeleton from "./GoalCardSkeleton";
import NoGoalsMessage from "./NoGoalsMessage";
import CreateGoalSheet from "./CreateGoalSheet";
import Search from "@/components/Search";
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

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <GoalCardSkeleton key={i} />
          ))}
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  if (!goals?.length && !name) return <NoGoalsMessage />;

  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-6">
        <Search id="name" label="Search" queryKey="name" />
        <CreateGoalSheet />
      </div>
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
