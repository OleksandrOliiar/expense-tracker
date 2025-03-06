import { db } from "@/db";
import { budgets } from "@/db/schema";
import { and, eq, gte, isNull, lte } from "drizzle-orm";
import { calculateBudgetAmount } from "./calculateBudgetAmount";

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
  }

  return relevantBudgets.length;
}
