import { useQuery } from "@tanstack/react-query";
import { getUserCategoriesWithTransactions } from "../actions/getUserCategories";

export const useCategories = (searchQuery?: string | null) => {
  return useQuery({
    queryKey: ["categories", "list", searchQuery],
    queryFn: () =>
      getUserCategoriesWithTransactions(
        searchQuery === null ? undefined : searchQuery
      ),
    enabled: searchQuery !== null,
  });
};
