"use server";

import { db } from "@/db";
import { accounts, subscriptions } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

export type UserSubscription = {
  id: string;
  status: string;
  productName: string | null;
  priceAmount: number | null;
  currency: string | null;
  interval: string | null;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean | null;
};

export const getUserSubscription = async (): Promise<UserSubscription | null> => {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("User is not authenticated");
    }

    const user = await getUser();

    const account = await db.query.accounts.findFirst({
      where: eq(accounts.kindeId, user.id),
    });

    if (!account || !account.stripeCustomerId) {
      return null;
    }

    const subscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.stripeCustomerId, account.stripeCustomerId),
    });

    if (!subscription) {
      return null;
    }

    return {
      id: subscription.id,
      status: subscription.status,
      productName: subscription.productName,
      priceAmount: subscription.priceAmount ? Number(subscription.priceAmount) : null,
      currency: subscription.currency,
      interval: subscription.interval,
      currentPeriodStart: subscription.currentPeriodStart,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
    };
  } catch (error) {
    console.error("Error getting user subscription:", error);
    throw error;
  }
};