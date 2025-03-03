"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserTransactions } from "../actions/getUserTransactions";
import { columns } from "./Columns";
import { TransactionsTable } from "./TransactionsTable";

const TransactionsClient = () => {
  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ["transactions", "list"],
    queryFn: () => getUserTransactions(),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return <TransactionsTable columns={columns} data={transactions ?? []} />;
};

export default TransactionsClient;
