"use server";

import { stripe } from "@/lib/stripe";
import { Interval, Product } from "@/types/Product";
import Stripe from "stripe";

const isStripeProduct = (product: any): product is Stripe.Product => {
  return "name" in product && "description" in product;
};

export const getProducts = async () => {
  try {
    const { data } = await stripe.prices.list({
      expand: ["data.product"],
    });

    let products: Product[] = [];

    for (const price of data) {
      if (isStripeProduct(price.product) && price.product.active) {
        products.push({
          priceId: price.id,
          name: price.product.name,
          description: price.product.description,
          unitAmount: price.unit_amount,
          currency: price.currency,
          marketingFeatures: price.product.marketing_features,
          interval: price.recurring?.interval as Interval,
        });
      }
    }

    return products;
  } catch (error) {
    console.log(error);

    throw new Error("failed to get products");
  }
};
