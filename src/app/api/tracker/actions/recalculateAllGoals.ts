import { db } from "@/db";
import { goals } from "@/db/schema";
import { eq } from "drizzle-orm";
import { calculateGoalAmount } from "./calculateGoalAmount";

export async function recalculateAllGoals(userId: string) {
  const userGoals = await db
    .select()
    .from(goals)
    .where(eq(goals.userId, userId));

  for (const goal of userGoals) {
    const newAmount = await calculateGoalAmount(
      userId,
      goal.startDate,
      goal.endDate
    );

    await db
      .update(goals)
      .set({
        currentAmount: newAmount.toString(),
        isCompleted: Number(newAmount) >= Number(goal.targetAmount),
      })
      .where(eq(goals.id, goal.id));
  }

  return userGoals.length;
}
