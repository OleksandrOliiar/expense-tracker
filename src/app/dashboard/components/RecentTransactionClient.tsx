"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecentTransactions } from "../actions/getDashboardData";
import RecentTransactionsCard from "./RecentTransactionsCard";

const RecentTransactionClient = () => {
  const {
    data: recentTransactions,
  } = useQuery({
    queryKey: ["dashboard", "recentTransactions"],
    queryFn: () => getRecentTransactions(),
  });

  return <RecentTransactionsCard transactions={recentTransactions} />;
};

export default RecentTransactionClient;
