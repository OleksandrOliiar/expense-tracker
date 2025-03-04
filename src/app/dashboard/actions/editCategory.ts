"use server"

import { db } from "@/db";
import {
  editCategorySchema,
  EditCategorySchema,
} from "../validations/editCategorySchema";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export const editCategory = async (data: EditCategorySchema) => {
  const result = editCategorySchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.toString());
  }

  const { id, ...rest } = result.data;

  try {
    await db.update(categories).set(rest).where(eq(categories.id, id));
  } catch (error) {
    console.log("Error editing category", error);
    throw error;
  }
};
