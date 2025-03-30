import { goals } from "@/db/schema";
import { db } from "@/db";
import { and, eq, gte, lte } from "drizzle-orm";
import { calculateGoalAmount } from "./calculateGoalAmount";
import { beamsServer } from "@/lib/pusherServer";

export async function updateRelevantGoals(
  userId: string,
  transactionDate: Date
) {
  const relevantGoals = await db
    .select()
    .from(goals)
    .where(
      and(
        eq(goals.userId, userId),
        lte(goals.startDate, transactionDate),
        gte(goals.endDate, transactionDate)
      )
    );

  // Update each goal with its recalculated amount
  for (const goal of relevantGoals) {
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

    if (Number(newAmount) >= Number(goal.targetAmount)) {
      await beamsServer.publishToUsers([goal.userId], {
        web: {
          notification: {
            title: "Congratulations!",
            body: `You have successfully reached ${goal.title} goal!`,
          },
        },
      });
    }
  }

  return relevantGoals.length;
}
