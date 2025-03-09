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
  sort?: string;
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
  sort,
}: TransactionsServerProps) => {
  const queryClient = new QueryClient();

  const [field, order] = sort?.split("-") ?? [];

  let formattedSort;

  if (field && order) {
    formattedSort = [
      {
        id: field,
        desc: order === "desc",
      },
    ];
  }

  const formattedParams = {
    name: name ?? null,
    startDate: startDate ?? null,
    endDate: endDate ?? null,
    categories: categories ?? null,
    type: type ?? null,
    date: date ?? null,
    page: page ? parseInt(page) : undefined,
    perPage: perPage ? parseInt(perPage) : undefined,
    sort: formattedSort,
  };

  await queryClient.fetchQuery({
    queryKey: ["transactions", "list", formattedParams],
    queryFn: () => getUserTransactions(formattedParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionsClient />
    </HydrationBoundary>
  );
};

export default TransactionsServer;
