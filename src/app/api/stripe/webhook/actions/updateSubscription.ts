import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { CreateSubscriptionProps } from "@/db/types";
import { eq } from "drizzle-orm";

export const updateSubscription = async ({
  stripeSubscriptionId,
  ...subscription
}: Omit<CreateSubscriptionProps, "id">) => {
  try {
    await db
      .update(subscriptions)
      .set({
        ...subscription,
      })
      .where(eq(subscriptions.stripeSubscriptionId, stripeSubscriptionId));
  } catch (error) {
    console.error(error);
    throw new Error("failed to update user subscription");
  }
};
