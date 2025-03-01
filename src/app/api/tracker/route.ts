import { NextRequest, NextResponse } from "next/server";
import { getUserGoalsWithTransactions } from "./actions/getUserGoals";
import { batchUpdateGoalAmounts } from "./actions/updateGoalAmount";
import { Notification } from "@onesignal/node-onesignal"
import { oneSignalClient } from "@/lib/oneSignal";

export async function POST(request: NextRequest) {
  try {
    console.log("Tracker webhook called");
    const body = await request.json();
    const { userId } = body;

    const { userGoals, transactionSums } = await getUserGoalsWithTransactions(
      userId
    );

    if (!userGoals.length) {
      return NextResponse.json(
        { message: "No goals found for user" },
        { status: 200 }
      );
    }

    const updates: {
      goalId: string;
      currentAmount: number;
      isCompleted: boolean;
    }[] = [];
    
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
          totalAmount += +amount;
        }
      });

      const isCompleted = Number(totalAmount) >= Number(goal.targetAmount);

      if (isCompleted && !goal.isCompleted) {
        console.log("Sending notification");
        const notification = new Notification();
        notification.app_id = process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID!;
        notification.contents = {
          en: "Hello OneSignal!"
        };
        notification.included_segments = ['Subscribed Users'];
        await oneSignalClient.createNotification(notification);
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
