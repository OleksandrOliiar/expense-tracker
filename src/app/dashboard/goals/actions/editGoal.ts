"use server";

import { goals } from "@/db/schema";
import { editGoalSchema, EditGoalSchema } from "../validations/editGoalSchema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { calculateCurrentAmount } from "./calculateCurrentAmount";

export const editGoal = async (data: EditGoalSchema) => {
  const result = editGoalSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  const { id, ...rest } = result.data;

  try {
    const { isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const [originalGoal] = await db
      .select()
      .from(goals)
      .where(eq(goals.id, id));

    if (!originalGoal) {
      throw new Error("Goal not found");
    }

    const needsRecalculation =
      originalGoal.startDate !== rest.startDate.toString() ||
      originalGoal.endDate !== rest.endDate.toString();

    let currentAmount = originalGoal.currentAmount;
    if (needsRecalculation) {
      currentAmount = await calculateCurrentAmount({
        startDate: rest.startDate,
        endDate: rest.endDate,
        userId: originalGoal.userId,
      });
    }

    const result = await db
      .update(goals)
      .set({
        ...rest,
        targetAmount: rest.targetAmount.toString(),
        endDate: rest.endDate?.toString(),
        startDate: rest.startDate?.toString(),
        currentAmount,
      })
      .where(eq(goals.id, id));

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to edit goal");
  }
};
