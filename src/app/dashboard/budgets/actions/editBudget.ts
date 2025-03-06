"use server";

import { budgets } from "@/db/schema";
import {
  editBudgetSchema,
  EditBudgetSchema,
} from "../validations/editBudgetSchema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { calculateCurrentAmount } from "./calculateCurrentAmount";

export const editBudget = async (data: EditBudgetSchema) => {
  const result = editBudgetSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  const { id, ...rest } = result.data;

  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();
    if (!user?.id) throw new Error("User not found");

    const [originalBudget] = await db
      .select()
      .from(budgets)
      .where(eq(budgets.id, id));

    if (!originalBudget) {
      throw new Error("Budget not found");
    }

    const needsRecalculation =
      rest.startDate !== originalBudget.startDate ||
      rest.endDate !== originalBudget.endDate ||
      rest.categoryId !== originalBudget.categoryId;

    let currentAmount = originalBudget.currentAmount;
    if (needsRecalculation) {
      const startDate = new Date(rest.startDate || originalBudget.startDate);
      const endDate = new Date(rest.endDate || originalBudget.endDate);
      
      currentAmount = await calculateCurrentAmount({
        startDate,
        endDate,
        categoryId: rest.categoryId,
        userId: user.id,
      });
    }

    const result = await db
      .update(budgets)
      .set({
        ...rest,
        currentAmount: currentAmount?.toString(),
        targetAmount: rest.targetAmount.toString(),
        endDate: rest.endDate,
        startDate: rest.startDate,
      })
      .where(eq(budgets.id, id));

    return result;
  } catch (error) {
    console.error("failed to edit budget", error);
    throw new Error("Failed to edit budget");
  }
}; 