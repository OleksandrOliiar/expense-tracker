"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  createGoalSchema,
  CreateGoalSchema,
} from "../validations/createGoalSchema";

import { goals } from "@/db/schema";
import { db } from "@/db";
import { calculateCurrentAmount } from "./calculateCurrentAmount";

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

    const currentAmount = await calculateCurrentAmount({
      startDate: result.data.startDate,
      endDate: result.data.endDate,
      userId: user.id,
    });

    const goal = await db
      .insert(goals)
      .values({
        id: crypto.randomUUID(),
        userId: user.id,
        title: result.data.title,
        description: result.data.description,
        targetAmount: result.data.targetAmount.toString(),
        endDate: result.data.endDate,
        startDate: result.data.startDate,
        currentAmount,
      })
      .returning();

    return goal;
  } catch (error) {
    console.log("Error creating goal", error);
    throw error;
  }
};
