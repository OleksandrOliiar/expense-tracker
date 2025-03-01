"use server";

import { goals } from "@/db/schema";
import {
  editGoalSchema,
  EditGoalSchema,
} from "../validations/editGoalSchema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { qstashClient } from "@/lib/qstash";

export const editGoal = async (data: EditGoalSchema) => {
  const result = editGoalSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  const { id, ...rest } = result.data;

  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    const result = await db
      .update(goals)
      .set({
        ...rest,
        targetAmount: rest.targetAmount.toString(),
        currentAmount: rest.currentAmount.toString(),
        endDate: rest.dueDate?.toString(),
        startDate: rest.startDate?.toString(),
      })
      .where(eq(goals.id, id));

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to edit goal");
  }
}; 