import CategoriesServer from "./components/CategoriesServer";
import CreateCategoryDialog from "./components/CreateCategoryDialog";

const Categories = () => {
  return (
    <>
      <CreateCategoryDialog />
      <CategoriesServer />
    </>
  );
};

export default Categories;
