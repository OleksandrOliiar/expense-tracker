import { useQuery } from "@tanstack/react-query";
import { getUserCategories } from "../categories/actions/getUserCategories";

export const useCategories = (searchQuery?: string) => {
  return useQuery({
    queryKey: ["categories", "list", searchQuery],
    queryFn: () => getUserCategories(searchQuery),
  });
};
