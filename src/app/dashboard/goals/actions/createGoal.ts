"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  createGoalSchema,
  CreateGoalSchema,
} from "../validations/createGoalSchema";

import { goals } from "@/db/schema";
import { db } from "@/db";
import { calculateCurrentAmount } from "./calculateCurrentAmount";
import { getUserSubscription } from "@/lib/stripe";
import { count, eq } from "drizzle-orm";

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

    const subscription = await getUserSubscription();

    const goalsCount = await db
      .select({ count: count() })
      .from(goals)
      .where(eq(goals.userId, user.id));

    if (goalsCount[0].count >= 3 && !subscription) {
      return {
        error: "LIMIT_REACHED",
        message: "You have reached the limit of 3 goals",
      };
    }

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
    return { error: "UNKNOWN_ERROR", message: "Failed to create goal" };
  }
};
