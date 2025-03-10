import { db } from "@/db";
import { accounts, subscriptions } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const subscriptionsMap = {
  [process.env.STRIPE_PRO_SUBSCRIPTION_ID!]: "PRO",
  [process.env.STRIPE_PLUS_SUBSCRIPTION_ID!]: "PLUS",
};

export const getUserSubscription = async () => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("User is not authenticated");
    }

    const { id } = await getUser();

    const user = await db.query.accounts.findFirst({
      where: eq(accounts.kindeId, id),
    });

    if (!user) {
      throw new Error("User not found");
    }

    const { stripeCustomerId } = user;

    if (!stripeCustomerId) {
      throw new Error("Stripe customer ID not found");
    }

    const subscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.stripeCustomerId, stripeCustomerId),
    });

    if (!subscription) {
      return null;
    }

    return {
      stripePriceId: subscription.stripePriceId,
      stripeProductId: subscription.stripeProductId,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user subscription");
  }
};
