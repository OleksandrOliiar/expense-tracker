"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  createGoalSchema,
  CreateGoalSchema,
} from "../validations/createGoalSchema";

import { goals } from "@/db/schema";
import { db } from "@/db";

export const createGoal = async (data: CreateGoalSchema) => {
  const result = createGoalSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.toString());
  }

  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    const goal = await db
      .insert(goals)
      .values({
        id: crypto.randomUUID(),
        userId: user.id,
        title: result.data.title,
        description: result.data.description,
        targetAmount: result.data.targetAmount.toString(),
        currentAmount: (result.data.currentAmount || 0).toString(),
        endDate: result.data.dueDate?.toString(),
      })
      .returning();

    return goal;
  } catch (error) {
    console.log("Error creating goal", error);
    throw error;
  }
};
