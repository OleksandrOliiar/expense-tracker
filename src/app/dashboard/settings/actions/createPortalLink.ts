"use server";

import { db } from "@/db";
import { accounts } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

export const createPortalLink = async () => {
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

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings`,
    });

    return portalSession.url;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create portal link");
  }
};
