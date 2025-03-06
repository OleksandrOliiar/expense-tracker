"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  createBudgetSchema,
  CreateBudgetSchema,
} from "../validations/createBudgetSchema";
import { db } from "@/db";
import { budgets } from "@/db/schema";
import { calculateCurrentAmount } from "./calculateCurrentAmount";

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

    return budget;
  } catch (error) {
    console.log("Error creating budget", error);
    throw error;
  }
};
