"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { useCategories } from "../../hooks/useCategories";
import CategoryCard from "./CategoryCard";

const CategoriesClient = () => {
  const searchParams = useSearchParams();

  const {
    data: categories,
    isLoading,
    error,
  } = useCategories(searchParams.get("name") ?? undefined);

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
    <div className="flex flex-wrap items-center gap-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
    </div>
  );
};

export default CategoriesClient;
