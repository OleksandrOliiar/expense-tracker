"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { categories } from "@/db/schema";

export const getUserCategories = async () => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const userCategories = await db.query.categories.findMany({
      where: eq(categories.userId, userId),
    });

    return userCategories;
  } catch (error) {
    console.log("Failed to get categories", error);
    throw new Error("Failed to get categories");
  }
};
