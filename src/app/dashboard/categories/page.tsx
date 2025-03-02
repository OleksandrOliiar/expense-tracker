import CategoriesServer from "./components/CategoriesServer";
import CreateCategoryDialog from "./components/CreateCategoryDialog";

const Categories = () => {
  return (
    <div className="px-4">
      <div className="flex justify-end mb-6">
        <CreateCategoryDialog />
      </div>
      <CategoriesServer />
    </div>
  );
};

export default Categories;
