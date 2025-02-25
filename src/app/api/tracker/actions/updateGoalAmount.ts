import { db } from "@/db";
import { goals } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Updates the current amount for multiple goals in a single operation
 *
 * @param updates Array of objects containing goalId and the new currentAmount
 */
export async function batchUpdateGoalAmounts(
  updates: { goalId: string; currentAmount: number }[]
) {
  console.log({ updates });
  if (!updates.length) return;


  // Process each update sequentially
  for (const { goalId, currentAmount } of updates) {
    await db
      .update(goals)
      .set({ currentAmount: currentAmount.toString() })
      .where(eq(goals.id, goalId));
  }

  console.log(`Updated ${updates.length} goals with new amounts`);
  return updates.length;
}
