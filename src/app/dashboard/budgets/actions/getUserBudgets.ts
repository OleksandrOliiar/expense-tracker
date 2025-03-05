"use server";

import { db } from "@/db";
import { budgets, categories } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq, like } from "drizzle-orm";

export const getUserBudgets = async (name?: string) => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    const query = db
      .select({
        id: budgets.id,
        title: budgets.title,
        currentAmount: budgets.currentAmount,
        targetAmount: budgets.targetAmount,
        startDate: budgets.startDate,
        endDate: budgets.endDate,
        category: {
          name: categories.name,
          id: categories.id,
          icon: categories.icon,
        },
        description: budgets.description,
        isCompleted: budgets.isCompleted,
      })
      .from(budgets)
      .where(eq(budgets.userId, user.id))
      .leftJoin(categories, eq(budgets.categoryId, categories.id))
      .groupBy(categories.id, budgets.id)
      .$dynamic();

    if (name && name.trim() !== "") {
      query.where(like(budgets.title, `%${name}%`));
    }

    const userBudgets = await query;

    return userBudgets;
  } catch (error) {
    console.error("Error getting user budgets", error);
    throw new Error("Failed to get user budgets");
  }
};

export type UserBudget = {
  id: string;
  title: string;
  currentAmount: string;
  targetAmount: string;
  startDate: string | null;
  endDate: string | null;
  category: {
    id: string;
    name: string;
    icon: string | null;
  } | null;
  description: string | null;
  isCompleted: boolean;
};
