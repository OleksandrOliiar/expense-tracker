"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserTransactions } from "../actions/getUserTransactions";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";

const TransactionsClient = () => {
  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ["transactions", "list"],
    queryFn: () => getUserTransactions(),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return <DataTable columns={columns} data={transactions ?? []} />;
};

export default TransactionsClient;
