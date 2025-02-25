import { NextRequest, NextResponse } from "next/server";
import { getUserGoalsWithTransactions } from "./actions/getUserGoals";
import { batchUpdateGoalAmounts } from "./actions/updateGoalAmount";

export async function POST(request: NextRequest) {
  try {
    console.log("Tracker webhook received");

    const body = await request.json();
    const { userId } = body;

    const { userGoals, transactionSums } = await getUserGoalsWithTransactions(
      userId
    );

    console.log(transactionSums);

    if (!userGoals.length) {
      console.log("No goals found for user");
      return NextResponse.json(
        { message: "No goals found for user" },
        { status: 200 }
      );
    }

    const updates: { goalId: string; currentAmount: number; isCompleted: boolean }[] = [];
    const now = new Date();

    for (const goal of userGoals) {
      const goalEndDate = new Date(goal.endDate as string);
      if (goalEndDate < now) continue;

      const goalStartDate = new Date(goal.startDate as string);

      // Calculate total amount by summing all transactions after the goal start date
      let totalAmount = 0;
      Array.from(transactionSums).forEach(([dateStr, amount]) => {
        const transactionDate = new Date(dateStr);
        if (transactionDate >= goalStartDate) {
          totalAmount += amount;
        }
      });

      const isCompleted = Number(totalAmount) >= Number(goal.targetAmount);

      if (isCompleted) {
        console.log(`Goal ${goal.id} completed!`);
      }

      updates.push({
        goalId: goal.id,
        currentAmount: totalAmount,
        isCompleted,
      });
    }

    await batchUpdateGoalAmounts(updates);

    return NextResponse.json(
      { message: "Goals updated successfully", updatedGoals: updates.length },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in tracker webhook", error);
    return NextResponse.json(
      { message: "Error in tracker webhook" },
      { status: 500 }
    );
  }
}
