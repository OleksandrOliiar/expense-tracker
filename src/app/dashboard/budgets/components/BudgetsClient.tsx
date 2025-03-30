"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getUserBudgets } from "../actions/getUserBudgets";
import BudgetsCard from "./BudgetsCard";
import NoBudgetsMessage from "./NoBudgetsMessage";
import NoSearchResults from "./NoSearchResults";

const BudgetsClient = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? undefined;

  const { data: goals } = useQuery({
    queryKey: ["budgets", "list", name],
    queryFn: () => getUserBudgets(name),
  });

  if (!goals?.length && !name) return <NoBudgetsMessage />;

  return (
    <>
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
