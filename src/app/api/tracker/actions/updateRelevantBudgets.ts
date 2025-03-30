import { db } from "@/db";
import { budgets } from "@/db/schema";
import { and, eq, gte, isNull, lte } from "drizzle-orm";
import { calculateBudgetAmount } from "./calculateBudgetAmount";
import { beamsServer } from "@/lib/pusherServer";

export async function updateRelevantBudgets(
  userId: string,
  transactionDate: Date,
  categoryId: string | null
) {
  const relevantBudgets = await db
    .select()
    .from(budgets)
    .where(
      and(
        eq(budgets.userId, userId),
        lte(budgets.startDate, transactionDate),
        gte(budgets.endDate, transactionDate),
        categoryId
          ? eq(budgets.categoryId, categoryId)
          : isNull(budgets.categoryId)
      )
    );

  for (const budget of relevantBudgets) {
    const newAmount = await calculateBudgetAmount(
      userId,
      budget.startDate,
      budget.endDate,
      budget.categoryId
    );

    await db
      .update(budgets)
      .set({
        currentAmount: newAmount.toString(),
        isCompleted: Number(newAmount) >= Number(budget.targetAmount),
      })
      .where(eq(budgets.id, budget.id));

    if (Number(newAmount) > Number(budget.targetAmount)) {
      await beamsServer.publishToUsers([budget.userId], {
        web: {
          notification: {
            title: "Attention!",
            body: `You have exceeded ${budget.title} budget!`,
          },
        },
      });
    }
  }

  return relevantBudgets.length;
}
