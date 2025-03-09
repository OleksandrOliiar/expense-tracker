"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserTransactions } from "../actions/getUserTransactions";
import { columns } from "./Columns";
import { TransactionsTable } from "./TransactionsTable";
import { useSearchParams } from "next/navigation";

const TransactionsClient = () => {
  const searchParams = useSearchParams();

  let formattedSort: { id: string; desc: boolean }[] | undefined;

  const [field, order] = searchParams.get("sort")?.split("-") ?? [];

  if (field && order) {
    formattedSort = [
      {
        id: field,
        desc: order === "desc",
      },
    ];
  }

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
        sort: formattedSort,
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
        sort: formattedSort,
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
