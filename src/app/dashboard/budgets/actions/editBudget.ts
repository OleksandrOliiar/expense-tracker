"use server";

import { budgets, goals } from "@/db/schema";
import {
  editBudgetSchema,
  EditBudgetSchema,
} from "../validations/editBudgetSchema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const editBudget = async (data: EditBudgetSchema) => {
  const result = editBudgetSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  const { id, ...rest } = result.data;

  try {
    const { isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const result = await db
      .update(budgets)
      .set({
        ...rest,
        targetAmount: rest.targetAmount.toString(),
        endDate: rest.endDate?.toString(),
        startDate: rest.startDate?.toString(),
      })
      .where(eq(budgets.id, id));

    return result;
  } catch (error) {
    console.error("failed to edit budget", error);
    throw new Error("Failed to edit budget");
  }
}; 