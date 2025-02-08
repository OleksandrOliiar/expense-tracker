import { getUserCategories } from "../actions/getUserCategories";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CategoriesClient from "./CategoriesClient";

const CategoriesServer = async () => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["categories", "list"],
    queryFn: () => getUserCategories(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoriesClient />
    </HydrationBoundary>
  );
};

export default CategoriesServer;
