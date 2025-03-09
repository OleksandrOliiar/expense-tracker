import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUserTransactions } from "../actions/getUserTransactions";
import TransactionsClient from "./TransactionsClient";

type TransactionsServerProps = {
  name?: string;
  startDate?: string;
  endDate?: string;
  categories?: string;
  type?: "income" | "expense" | "all";
  date?: string;
  page?: string;
  perPage?: string;
};

const TransactionsServer = async ({
  name,
  endDate,
  startDate,
  categories,
  type,
  date,
  page,
  perPage,
}: TransactionsServerProps) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: [
      "transactions",
      "list",
      {
        name: name ?? null,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
        categories: categories ?? null,
        type: type ?? null,
        date: date ?? null,
        page: page ? parseInt(page) : undefined,
        perPage: perPage ? parseInt(perPage) : undefined,
      },
    ],
    queryFn: () =>
      getUserTransactions({
        name: name ?? null,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
        categories: categories ?? null,
        type: type ?? null,
        date: date ?? null,
        page: page ? parseInt(page) : undefined,
        perPage: perPage ? parseInt(perPage) : undefined,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionsClient />
    </HydrationBoundary>
  );
};

export default TransactionsServer;
