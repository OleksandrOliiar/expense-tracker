import CategoriesServer from "./components/CategoriesServer";

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
