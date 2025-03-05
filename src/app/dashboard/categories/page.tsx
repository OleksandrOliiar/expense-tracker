import Search from "@/components/Search";
import CategoriesServer from "./components/CategoriesServer";
import CreateCategoryDialog from "./components/CreateCategoryDialog";

type CategoriesProps = {
  searchParams: {
    name?: string;
  };
};

const Categories = ({ searchParams }: CategoriesProps) => {
  return (
    <div className="px-4">
      <CategoriesServer name={searchParams.name} />
    </div>
  );
};

export default Categories;
