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
      <CategoriesServer name={searchParams.name} />
    </div>
  );
};

export default Categories;
