import { getUserCategories } from "../actions/getUserCategories";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CategoriesClient from "./CategoriesClient";

type CategoriesServerProps = {
  name?: string;
};

const CategoriesServer = async ({ name }: CategoriesServerProps) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["categories", "list", name],
    queryFn: () => getUserCategories(name),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoriesClient />
    </HydrationBoundary>
  );
};

export default CategoriesServer;
