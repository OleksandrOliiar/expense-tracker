"use server";

import { plaidClient } from "@/lib/plaid";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CountryCode, Products } from "plaid";

export const generateLinkToken = async () => {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("User is not authenticated");
    }

    const user = await getUser();

    const tokenResponse = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: user.id,
      },
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: "en",
      client_name: "Expense Tracker",
      webhook: process.env.PLAID_WEBHOOK_URL,
      
    });

    return tokenResponse.data;
  } catch (error) {
    console.log("Error generating link token", error);
    throw error;
  }
};
