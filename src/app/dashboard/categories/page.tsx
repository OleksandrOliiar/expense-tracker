import DashboardNavigation from "../components/DashboardNavigation";
import CategoriesServer from "./components/CategoriesServer";

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
        <CategoriesServer name={searchParams.name} page={searchParams.page} />
      </div>
    </>
  );
};

export default Categories;
