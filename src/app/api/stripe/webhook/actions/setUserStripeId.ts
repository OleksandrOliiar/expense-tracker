import { db } from "@/db";
import { accounts } from "@/db/schema";
import { eq } from "drizzle-orm";

export const setUserStripeId = async (
  kindeId: string,
  stripeCustomerId: string
) => {
  try {
    await db
      .update(accounts)
      .set({ stripeCustomerId })
      .where(eq(accounts.kindeId, kindeId));
  } catch (error) {
    console.error(error);
    throw new Error("failed to set user stripe id");
  }
};
