import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteSubscription = async (stripeSubscriptionId: string) => {
  try {
    await db
      .delete(subscriptions)
      .where(eq(subscriptions.stripeSubscriptionId, stripeSubscriptionId));
  } catch (error) {
    console.error(error);
    throw new Error("failed to delete subscription");
  }
};
