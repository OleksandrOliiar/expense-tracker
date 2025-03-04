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
        payee: searchParams.get("payee") ?? null,
        startDate: searchParams.get("startDate") ?? null,
        endDate: searchParams.get("endDate") ?? null,
        categories: searchParams.get("categories") ?? null,
      },
    ],
    queryFn: () =>
      getUserTransactions({
        payee: searchParams.get("payee") ?? null,
        startDate: searchParams.get("startDate") ?? null,
        endDate: searchParams.get("endDate") ?? null,
        categories: searchParams.get("categories") ?? null,
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
