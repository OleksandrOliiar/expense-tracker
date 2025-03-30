import { Suspense } from "react";
import DashboardNavigation from "../components/DashboardNavigation";
import CategoriesServer from "./components/CategoriesServer";
import CategoriesSkeleton from "./components/CategoriesSkeleton";

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
        <Suspense fallback={<CategoriesSkeleton />}>
          <CategoriesServer name={searchParams.name} page={searchParams.page} />
        </Suspense>
      </div>
    </>
  );
};

export default Categories;
