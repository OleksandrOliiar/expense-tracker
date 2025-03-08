import { useQuery } from "@tanstack/react-query";
import { getUserCategoriesWithTransactions } from "../actions/getUserCategories";

export const useCategories = (searchQuery?: string) => {
  return useQuery({
    queryKey: ["categories", "list", searchQuery],
    queryFn: () => getUserCategoriesWithTransactions(searchQuery),
    enabled: searchQuery !== null,
  });
};
