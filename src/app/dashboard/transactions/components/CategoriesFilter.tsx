import { useEffect, useState } from "react";
import CategoryPicker from "./CategoryPicker";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

const CategoriesFilter = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const debouncedCategories = useDebouncedValue(categories, 300);

  const { setQueryParams } = useQueryParams();

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
