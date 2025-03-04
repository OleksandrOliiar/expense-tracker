import { useEffect, useState } from "react";
import CategoryPicker from "./CategoryPicker";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

const CategoriesFilter = () => {
  const { setQueryParams, queryParams } = useQueryParams();

  const [categories, setCategories] = useState<string[]>(() => {
    const categoriesString = queryParams.get("categories");
    return categoriesString ? categoriesString.split(",") : [];
  });
  
  const debouncedCategories = useDebouncedValue(categories, 300);

  useEffect(() => {
    if (debouncedCategories.length > 0) {
      setQueryParams({ categories: debouncedCategories.join(",") });
    } else {
      setQueryParams({ categories: undefined });
    }
  }, [debouncedCategories]);

  return (
    <CategoryPicker
      value={categories}
      onChange={setCategories}
      multiple={true}
      showAddCategory={false}
    />
  );
};

export default CategoriesFilter;
