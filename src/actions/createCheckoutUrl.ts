"use server";

import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const createCheckoutUrl = async (priceId: string) => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      redirect("/api/auth/login");
    }

    const headerList = headers();
    const origin = headerList.get("origin");

    const user = await getUser();

    const checkoutSession = await stripe.checkout.sessions.create({
      client_reference_id: user.id,
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: user.email!,
      tax_id_collection: {
        enabled: true,
      },
      metadata: {
        userId: user.id,
      },
      success_url: `${origin}/`,
      cancel_url: `${origin}/`,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
    });

    return {
      success: true,
      data: checkoutSession.url,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Failed to create checkout session",
    };
  }
};
