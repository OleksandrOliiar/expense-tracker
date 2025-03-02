"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserCategories } from "../actions/getUserCategories";
import CategoryCard from "./CategoryCard";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const CategoriesClient = () => {
  const searchParams = useSearchParams();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories", "list", searchParams.get("name")],
    queryFn: () => getUserCategories(searchParams.get("name") ?? undefined),
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

  if (!categories || categories.length === 0) {
    return <p>No categories found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
    </div>
  );
};

export default CategoriesClient;
