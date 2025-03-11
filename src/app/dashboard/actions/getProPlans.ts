"use server";

import { getProducts } from "@/actions/getProducts";

export const getProPlans = async () => {
  try {
    const products = await getProducts();

    const proPlans = products.filter(
      (product) =>
        product.productId === process.env.STRIPE_PRO_SUBSCRIPTION_ID
    );

    return proPlans;
  } catch (error) {
    console.log("Error getting pro plan", error);
    throw new Error("Error getting pro plan");
  }
};
