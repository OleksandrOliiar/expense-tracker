import { db } from "@/db";
import { transactions } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { recalculateAllGoals } from "./actions/recalculateAllGoals";
import { recalculateAllBudgets } from "./actions/recalculateAllBudgets";
import { updateRelevantGoals } from "./actions/updateRelevantGoals";
import { updateRelevantBudgets } from "./actions/updateRelevantBudgets";
import { Transaction } from "@/db/types";
import { pusherServer } from "@/lib/pusherServer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { transactionId, transactionIds, userId, type = "create" } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 400 }
      );
    }

    let updatedBudgets = 0;
    let updatedGoals = 0;

    if (type === "delete" && transactionIds?.length) {
      updatedGoals = await recalculateAllGoals(userId);
      updatedBudgets = await recalculateAllBudgets(userId);
    } else {
      let transactionsList: Transaction[] = [];

      if (type === "bulk" && transactionIds?.length) {
        transactionsList = await db
          .select()
          .from(transactions)
          .where(
            and(
              eq(transactions.userId, userId),
              inArray(transactions.id, transactionIds)
            )
          );
      } else if (transactionId) {
        const singleTransaction = await db
          .select()
          .from(transactions)
          .where(eq(transactions.id, transactionId));

        if (singleTransaction.length) {
          transactionsList = singleTransaction;
        }
      }

      for (const transaction of transactionsList) {
        const { amount, date, categoryId } = transaction;

        const goalResults = await updateRelevantGoals(userId, new Date(date));

        updatedGoals += goalResults;

        if (Number(amount) < 0) {
          const budgetResults = await updateRelevantBudgets(
            userId,
            new Date(date),
            categoryId
          );

          updatedBudgets += budgetResults;
        }
      }
    }

    console.log("updatedBudgets", updatedBudgets);
    console.log("updatedGoals", updatedGoals);

    if (updatedBudgets > 0) {
      console.log("triggering budgets-updated");
      pusherServer.trigger(userId, "budgets-updated", {});
    }

    if (updatedGoals > 0) {
      console.log("triggering goals-updated");
      pusherServer.trigger(userId, "goals-updated", {});
    }

    return NextResponse.json({
      message: "Successfully processed transaction changes",
    });
  } catch (error) {
    console.error("Error in transaction webhook:", error);
    return NextResponse.json(
      { message: "Error processing transaction changes" },
      { status: 500 }
    );
  }
}
