"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq,  } from "drizzle-orm";

export const getUserCategories = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    let userCategoriesQuery = db
      .select()
      .from(categories)
      .where(eq(categories.userId, userId));

    const userCategories = await userCategoriesQuery;

    return userCategories;
  } catch (error) {
    console.error("Failed to get categories", error);
    throw new Error("Failed to get categories");
  }
};
