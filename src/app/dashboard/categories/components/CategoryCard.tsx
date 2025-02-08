import { Category } from "@/db/types";

type CategoryCardProps = Pick<Category, "name" | "type" | "createdAt" | "icon">;

const CategoryCard = ({ name, type, createdAt, icon }: CategoryCardProps) => {
  return <div>{name}</div>;
};

export default CategoryCard;
