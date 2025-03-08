import { db } from "@/db";
import { categories } from "@/db/schema";
import { CreateCategoryProps } from "@/db/types";

export const addCategories = async (categoriesData: CreateCategoryProps[]) => {
  try {
    await db
      .insert(categories)
      .values(categoriesData)
      .onConflictDoNothing({
        target: [categories.id],
      });
  } catch (error) {
    console.log("Error adding categories", error);
    throw error;
  }
};
