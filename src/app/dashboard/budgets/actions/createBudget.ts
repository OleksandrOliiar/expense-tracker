"use server";

import { db } from "@/db";
import { budgets } from "@/db/schema";
import { getUserSubscription } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  createBudgetSchema,
  CreateBudgetSchema,
} from "../validations/createBudgetSchema";
import { calculateCurrentAmount } from "./calculateCurrentAmount";
import { count, eq } from "drizzle-orm";

export const createBudget = async (data: CreateBudgetSchema) => {
  const result = createBudgetSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.toString());
  }

  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    const subscription = await getUserSubscription();

    const budgetsCount = await db
      .select({ count: count() })
      .from(budgets)
      .where(eq(budgets.userId, user.id));

    if (budgetsCount[0].count >= 3 && !subscription) {
      return {
        error: "LIMIT_REACHED",
        message: "You have reached the limit of 3 budgets",
      };
    }

    const currentAmount = await calculateCurrentAmount({
      startDate: result.data.startDate,
      endDate: result.data.endDate,
      categoryId: result.data.categoryId,
      userId: user.id,
    });

    const budget = await db
      .insert(budgets)
      .values({
        id: crypto.randomUUID(),
        userId: user.id,
        title: result.data.title,
        description: result.data.description,
        targetAmount: result.data.targetAmount.toString(),
        endDate: result.data.endDate,
        startDate: result.data.startDate,
        categoryId: result.data.categoryId,
        currentAmount,
      })
      .returning();

    return { data: budget };
  } catch (error) {
    console.log("Error creating budget", error);

    return { error: "UNKNOWN_ERROR", message: "Failed to create budget" };
  }
};
