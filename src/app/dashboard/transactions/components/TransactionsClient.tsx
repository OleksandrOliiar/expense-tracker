"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserTransactions } from "../actions/getUserTransactions";
import { columns } from "./Columns";
import { TransactionsTable } from "./TransactionsTable";
import { useSearchParams } from "next/navigation";

const TransactionsClient = () => {
  const searchParams = useSearchParams();

  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "transactions",
      "list",
      {
        name: searchParams.get("name") ?? null,
        startDate: searchParams.get("startDate") ?? null,
        endDate: searchParams.get("endDate") ?? null,
        categories: searchParams.get("categories") ?? null,
        type: searchParams.get("type") ?? null,
        date: searchParams.get("date") ?? null,
      },
    ],
    queryFn: () =>
      getUserTransactions({
        name: searchParams.get("name") ?? null,
        startDate: searchParams.get("startDate") ?? null,
        endDate: searchParams.get("endDate") ?? null,
        categories: searchParams.get("categories") ?? null,
        type:
          (searchParams.get("type") as "all" | "income" | "expense") ?? null,
        date: searchParams.get("date") ?? null,
      }),
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <TransactionsTable
      columns={columns}
      data={transactions ?? []}
      isLoading={isLoading}
    />
  );
};

export default TransactionsClient;
