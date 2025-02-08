"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserCategories } from "../actions/getUserCategories";
import CategoryCard from "./CategoryCard";

const CategoriesClient = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories", "list"],
    queryFn: () => getUserCategories(),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!categories || categories.length === 0) {
    return <p>No categories found</p>;
  }

  return (
    <div className="flex items-center gap-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
    </div>
  );
};

export default CategoriesClient;
