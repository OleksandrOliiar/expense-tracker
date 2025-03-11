"use server";

import { db } from "@/db";
import { accounts } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { createPortalUrl } from "./createPortalUrl";

export const getPortalUrl = async () => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("User is not authenticated");
    }

    const user = await getUser();

    const account = await db.query.accounts.findFirst({
      where: eq(accounts.kindeId, user.id),
    });

    if (!account) {
      throw new Error("Account not found");
    }

    if (!account.stripeCustomerId) {
      throw new Error("Stripe customer ID not found");
    }

    const data = await createPortalUrl(account.stripeCustomerId);

    if (!data.success || !data.data) {
      throw new Error("Failed to create portal url");
    }

    return data.data;
  } catch (error) {
    console.log("Failed to get portal url: ", error);
    throw new Error("Failed to get portal url");
  }
};
