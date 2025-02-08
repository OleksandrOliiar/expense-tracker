"use server";

import { auth } from "@clerk/nextjs/server";
import {
  createCategorySchema,
  CreateCategorySchema,
} from "../validations/createCategorySchema";
import { db } from "@/db";
import { categories } from "@/db/schema";

export const createCategory = async (data: CreateCategorySchema) => {
  const result = createCategorySchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.toString());
  }

  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const category = await db.insert(categories).values({
      id: crypto.randomUUID(),
      userId,
      ...result.data,
    });

    return category;
  } catch (error) {
    console.log("Failed to create category", error);
    throw new Error("Failed to create category");
  }
};
