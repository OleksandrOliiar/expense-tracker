"use server";

import { db } from "@/db";
import { accounts, subscriptions } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

export const upgradeSubscription = async (priceId: string) => {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const account = await db.query.accounts.findFirst({
      where: eq(accounts.kindeId, user.id),
    });

    if (!account) {
      throw new Error("Account not found");
    }

    if (!account.stripeCustomerId) {
      throw new Error("Stripe customer ID not found");
    }

    const stripeSubscriptions = await stripe.subscriptions.list({
      customer: account.stripeCustomerId,
      limit: 1,
      status: "active",
    });

    const subscription = stripeSubscriptions.data[0];

    if (!subscription) {
      throw new Error("Subscription not found");
    }

    await stripe.subscriptions.update(subscription.id, {
      items: [
        { id: subscription.items.data[0].id, deleted: true },
        {
          price: priceId,
        },
      ],
      proration_behavior: "none",
      metadata: { internalUpdate: "true" },
    });

    await db
      .update(subscriptions)
      .set({
        stripePriceId: priceId,
        stripeProductId: process.env.STRIPE_PRO_SUBSCRIPTION_ID,
      })
      .where(eq(subscriptions.stripeSubscriptionId, subscription.id));
  } catch (error) {
    console.log("Failed to upgrade subscription", error);
    throw new Error("Failed to upgrade subscription");
  }
};
