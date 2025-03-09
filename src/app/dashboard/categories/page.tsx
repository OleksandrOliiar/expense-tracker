import CategoriesServer from "./components/CategoriesServer";

type CategoriesProps = {
  searchParams: {
    name?: string;
    page?: string;
  };
};

const Categories = ({ searchParams }: CategoriesProps) => {
  return (
    <div className="px-4">
      <CategoriesServer name={searchParams.name} page={searchParams.page} />
    </div>
  );
};

export default Categories;
