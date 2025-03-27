"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecentTransactions } from "../actions/getDashboardData";
import RecentTransactionsCard from "./RecentTransactionsCard";

const RecentTransactionClient = () => {
  const {
    data: recentTransactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard", "recentTransactions"],
    queryFn: () => getRecentTransactions(),
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!recentTransactions || recentTransactions.length === 0) {
    return <div>No recent transactions</div>;
  }

  return <RecentTransactionsCard transactions={recentTransactions} />;
};

export default RecentTransactionClient;
