"use server";

import {
  createCategorySchema,
  CreateCategorySchema,
} from "../validations/createCategorySchema";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const createCategory = async (data: CreateCategorySchema) => {
  const result = createCategorySchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.toString());
  }

  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    const category = await db.insert(categories).values({
      id: crypto.randomUUID(),
      userId: user.id,
      ...result.data,
    });

    return category;
  } catch (error) {
    console.log("Failed to create category", error);
    throw new Error("Failed to create category");
  }
};
