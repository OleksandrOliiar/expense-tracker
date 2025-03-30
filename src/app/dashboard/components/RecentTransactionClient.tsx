"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecentTransactions } from "../actions/getDashboardData";
import RecentTransactionsCard from "./RecentTransactionsCard";
import RecentTransactionsSkeleton from "./RecentTransactionsSkeleton";
import NoRecentTransactions from "./NoRecentTransactions";

const RecentTransactionClient = () => {
  const {
    data: recentTransactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard", "recentTransactions"],
    queryFn: () => getRecentTransactions(),
  });

  return <RecentTransactionsCard transactions={recentTransactions} />;
};

export default RecentTransactionClient;
