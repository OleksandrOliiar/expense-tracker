import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { CreateSubscriptionProps } from "@/db/types";

export const createSubscription = async (
  subscription: Omit<CreateSubscriptionProps, "id">
) => {
  try {
    await db.insert(subscriptions).values({
      ...subscription,
      id: crypto.randomUUID(),
    });
  } catch (error) {
    console.error(error);
    throw new Error("failed to create subscription");
  }
};
