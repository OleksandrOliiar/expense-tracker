"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserTransactions } from "../actions/getUserTransactions";
import { columns } from "./Columns";
import { TransactionsTable } from "./TransactionsTable";
import { useSearchParams } from "next/navigation";

const TransactionsClient = () => {
  const searchParams = useSearchParams();

  const { data, isLoading, error } = useQuery({
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
        page: searchParams.get("page")
          ? parseInt(searchParams.get("page")!)
          : undefined,
        perPage: searchParams.get("perPage")
          ? parseInt(searchParams.get("perPage")!)
          : undefined,
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
        page: searchParams.get("page")
          ? parseInt(searchParams.get("page")!)
          : undefined,
        perPage: searchParams.get("perPage")
          ? parseInt(searchParams.get("perPage")!)
          : undefined,
      }),
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <TransactionsTable
      columns={columns}
      data={data?.data ?? []}
      isLoading={isLoading}
      totalPages={data?.totalPages ?? 0}
    />
  );
};

export default TransactionsClient;
