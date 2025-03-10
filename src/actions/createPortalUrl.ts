"use server";

import { stripe } from "@/lib/stripe";

export const createPortalUrl = async (stripeCustomerId: string) => {
  try {
    const result = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
    });

    return {
      success: true,
      data: result.url,
    };
  } catch (error) {
    console.log("Failed to create portal url: ", error);

    return {
      success: false,
      error: "Failed to create portal url",
    };
  }
};
