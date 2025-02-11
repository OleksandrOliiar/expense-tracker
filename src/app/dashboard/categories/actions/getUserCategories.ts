"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

export const getUserCategories = async () => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    let userCategoriesQuery = db
      .select()
      .from(categories)
      .where(eq(categories.userId, user.id));

    const userCategories = await userCategoriesQuery;

    return userCategories;
  } catch (error) {
    console.error("Failed to get categories", error);
    throw new Error("Failed to get categories");
  }
};
