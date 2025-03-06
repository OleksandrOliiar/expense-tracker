import { db } from "@/db";
import { budgets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { calculateBudgetAmount } from "./calculateBudgetAmount";

export async function recalculateAllBudgets(userId: string) {
  const userBudgets = await db
    .select()
    .from(budgets)
    .where(eq(budgets.userId, userId));

  for (const budget of userBudgets) {
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
  }

  return userBudgets.length;
}
