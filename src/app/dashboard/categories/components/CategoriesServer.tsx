import { getUserCategoriesWithTransactions } from "../../actions/getUserCategories";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CategoriesClient from "./CategoriesClient";

type CategoriesServerProps = {
  name?: string;
  page?: string;
};

const CategoriesServer = async ({ name, page }: CategoriesServerProps) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: [
      "categories",
      "list",
      { name, page: page ? Number(page) : undefined },
    ],
    queryFn: () =>
      getUserCategoriesWithTransactions({
        name,
        page: page ? Number(page) : undefined,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoriesClient />
    </HydrationBoundary>
  );
};

export default CategoriesServer;
