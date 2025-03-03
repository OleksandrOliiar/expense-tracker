"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserTransactions } from "../actions/getUserTransactions";
import { columns } from "./Columns";
import { TransactionsTable } from "./TransactionsTable";
import { useSearchParams } from "next/navigation";
import TransactionsTableSkeleton from "./TransactionsTableSkeleton";

const TransactionsClient = () => {
  const searchParams = useSearchParams();
  const payee = searchParams.get("payee");

  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transactions", "list", { payee }],
    queryFn: () => getUserTransactions({ payee: payee ?? undefined }),
  });

  if (isLoading) return <TransactionsTableSkeleton />;

  if (error) return <div>Error: {error.message}</div>;

  return <TransactionsTable columns={columns} data={transactions ?? []} />;
};

export default TransactionsClient;
