import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { setUserStripeId } from "./actions/setUserStripeId";
import { createSubscription } from "./actions/createSubscription";
import { updateSubscription } from "./actions/updateSubscription";
import { deleteSubscription } from "./actions/deleteSubscription";

export const POST = async (request: NextRequest) => {
  const body = await request.text();
  const signature = headers().get("stripe-signature") ?? "";

  let data;
  let eventType;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  data = event.data;
  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;

        const customerId = session.customer as string;
        const metadata = session.metadata as { userId: string };

        await setUserStripeId(metadata.userId, customerId);

        break;
      case "customer.subscription.created":
        const createdSubscription = data.object as Stripe.Subscription;

        const priceData = createdSubscription.items.data[0].price;
        const productId = priceData.product as string;

        const product = await stripe.products.retrieve(productId);

        await createSubscription({
          stripeSubscriptionId: createdSubscription.id,
          stripeProductId: productId,
          stripeCustomerId: createdSubscription.customer as string,
          status: createdSubscription.status,
          stripePriceId: priceData.id,
          productName: product.name,
          priceAmount: priceData.unit_amount
            ? (priceData.unit_amount / 100).toString()
            : null,
          currency: priceData.currency,
          interval: priceData.recurring?.interval || null,
          currentPeriodStart: new Date(
            createdSubscription.current_period_start * 1000
          ),
          currentPeriodEnd: new Date(
            createdSubscription.current_period_end * 1000
          ),
          cancelAtPeriodEnd: createdSubscription.cancel_at_period_end,
        });

        break;
      case "customer.subscription.updated":
        const updatedSubscription = data.object as Stripe.Subscription;

        if (updatedSubscription.metadata.internalUpdate === "true") {
          await stripe.subscriptions.update(updatedSubscription.id, {
            metadata: { internalUpdate: "" }
          });
          
          break;
        }

        const updatedPriceData = updatedSubscription.items.data[0].price;
        const updatedProductId = updatedPriceData.product as string;

        const updatedProduct = await stripe.products.retrieve(updatedProductId);

        await updateSubscription({
          stripeSubscriptionId: updatedSubscription.id,
          stripeProductId: updatedProductId,
          stripeCustomerId: updatedSubscription.customer as string,
          status: updatedSubscription.status,
          stripePriceId: updatedPriceData.id,
          productName: updatedProduct.name,
          priceAmount: updatedPriceData.unit_amount
            ? (updatedPriceData.unit_amount / 100).toString()
            : null,
          currency: updatedPriceData.currency,
          interval: updatedPriceData.recurring?.interval || null,
          currentPeriodStart: new Date(
            updatedSubscription.current_period_start * 1000
          ),
          currentPeriodEnd: new Date(
            updatedSubscription.current_period_end * 1000
          ),
          cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end,
        });

        break;
      case "customer.subscription.deleted":
        const deletedSubscription = data.object as Stripe.Subscription;

        await deleteSubscription(deletedSubscription.id);

        break;
      default:
        return NextResponse.json(
          { message: "Unhandled event type" },
          { status: 200 }
        );
    }
  } catch (error) {
    console.log("Failed to process webhook", error);

    return NextResponse.json({ message: "Unhandled error" }, { status: 500 });
  }

  return NextResponse.json({ message: "Webhook received" }, { status: 200 });
};
