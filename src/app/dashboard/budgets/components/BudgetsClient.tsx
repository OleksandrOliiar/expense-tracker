"use client";

import Search from "@/components/Search";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getUserBudgets } from "../actions/getUserBudgets";
import BudgetsCard from "./BudgetsCard";
import CreateBudgetSheet from "./CreateBudgetSheet";
import NoSearchResults from "./NoSearchResults";
import NoBudgetsMessage from "./NoBudgetsMessage";
import BudgetsCardSkeleton from "./BudgetCardSkeleton";

const BudgetsClient = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? undefined;

  const {
    data: goals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["budgets", "list", name],
    queryFn: () => getUserBudgets(name),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <BudgetsCardSkeleton key={i} />
          ))}
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  if (!goals?.length && !name) return <NoBudgetsMessage />;

  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-6">
        <Search id="name" label="Search" queryKey="name" />
        <CreateBudgetSheet />
      </div>
      {goals && goals?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          {goals.map((budget) => (
            <BudgetsCard key={budget.id} budget={budget} />
          ))}
        </div>
      ) : (
        <NoSearchResults searchQuery={name ?? ""} />
      )}
    </>
  );
};

export default BudgetsClient;
