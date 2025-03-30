"use client";

import Pagination from "@/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getUserCategoriesWithTransactions } from "../../actions/getUserCategories";
import CategoryCard from "./CategoryCard";
import NoCategoriesMessage from "./NoCategoriesMessage";
import NoSearchResults from "./NoSearchResult";

const CategoriesClient = () => {
  const searchParams = useSearchParams();

  const { data } = useQuery({
    queryKey: [
      "categories",
      "list",
      {
        name: searchParams.get("name") ?? undefined,
        page: Number(searchParams.get("page"))
          ? Number(searchParams.get("page"))
          : undefined,
      },
    ],
    queryFn: () =>
      getUserCategoriesWithTransactions({
        name: searchParams.get("name") ?? undefined,
        page: Number(searchParams.get("page"))
          ? Number(searchParams.get("page"))
          : undefined,
      }),
  });

  const categories = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  if (!categories.length && !searchParams.get("name"))
    return <NoCategoriesMessage />;

  return (
    <>
      {categories && categories?.length > 0 ? (
        <div className="flex flex-wrap items-stretch gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      ) : (
        <NoSearchResults searchQuery={searchParams.get("name") ?? ""} />
      )}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
};

export default CategoriesClient;
