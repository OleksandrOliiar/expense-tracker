"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getUserCategoriesWithTransactions } from "../../actions/getUserCategories";
import CategoryCard from "./CategoryCard";
import Search from "@/components/Search";
import CreateCategoryDialog from "./CreateCategoryDialog";
import NoSearchResults from "./NoSearchResult";
import NoCategoriesMessage from "./NoCategoriesMessage";

const CategoriesClient = () => {
  const searchParams = useSearchParams();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories", "list", searchParams.get("name") ?? undefined],
    queryFn: () =>
      getUserCategoriesWithTransactions(searchParams.get("name") ?? undefined),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton className="w-[81px] rounded-xl" key={index} />
        ))}
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  if (!categories?.length && !searchParams.get("name"))
    return <NoCategoriesMessage />;

  return (
    <>
      <div className="flex justify-between flex-wrap items-center mb-6 gap-4">
        <div className="max-w-[350px]">
          <Search
            queryKey="name"
            id="category-name"
            label="Search by name..."
          />
        </div>
        <CreateCategoryDialog />
      </div>
      {categories && categories?.length > 0 ? (
        <div className="flex flex-wrap items-center gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      ) : (
        <NoSearchResults searchQuery={searchParams.get("name") ?? ""} />
      )}
    </>
  );
};

export default CategoriesClient;
