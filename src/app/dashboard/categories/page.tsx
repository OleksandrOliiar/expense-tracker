import { Suspense } from "react";
import DashboardNavigation from "../components/DashboardNavigation";
import CategoriesServer from "./components/CategoriesServer";
import CategoriesSkeleton from "./components/CategoriesSkeleton";
import Search from "@/components/Search";
import CreateCategoryDialog from "./components/CreateCategoryDialog";

type CategoriesProps = {
  searchParams: {
    name?: string;
    page?: string;
  };
};

const Categories = ({ searchParams }: CategoriesProps) => {
  return (
    <>
      <header className="px-4 mb-8">
        <DashboardNavigation title="Categories" />
      </header>
      <div className="px-4">
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
        <Suspense fallback={<CategoriesSkeleton />}>
          <CategoriesServer name={searchParams.name} page={searchParams.page} />
        </Suspense>
      </div>
    </>
  );
};

export default Categories;
