"use server";

import { db } from "@/db";
import { plaidItems } from "@/db/schema";
import { getUserSubscription } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { count, eq } from "drizzle-orm";

export const checkSubscription = async () => {
  try {
    const subscription = await getUserSubscription();

    if (!subscription) {
      return {
        error: "SUBSCRIPTION_REQUIRED",
        message:
          "You must have an active subscription to connect your bank account",
      };
    }

    if (
      subscription.stripeProductId ===
      process.env.STRIPE_PLUS_SUBSCRIPTION_ID
    ) {
      const { getUser } = getKindeServerSession();

      const user = await getUser();

      const banksCount = await db
        .select({ count: count() })
        .from(plaidItems)
        .where(eq(plaidItems.accountId, user.id));

      if (banksCount[0].count >= 2) {
        return {
          error: "LIMIT_REACHED",
          message: "You have reached the limit of 2 bank accounts",
        };
      }
    }

    return {
      data: true,
    };
  } catch (error) {
    console.error("Error checking subscription:", error);

    return {
      error: "INTERNAL_SERVER_ERROR",
      message: "An internal server error occurred",
    };
  }
};
