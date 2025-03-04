"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteCategory(categoryId: string) {
  try {
    await db.delete(categories).where(eq(categories.id, categoryId));
  } catch (error) {
    console.log("Error deleting category", error);
    throw error;
  }
}
