"use server";

import { plaidClient } from "@/lib/plaid";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { populateBankData } from "./populateBankData";
import { syncData } from "./syncData";

export const exchangePublicToken = async (publicToken: string) => {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("User is not authenticated");
    }

    const user = await getUser();

    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const tokenData = tokenResponse.data;

    await populateBankData({
      itemId: tokenData.item_id,
      accessToken: tokenData.access_token,
      userId: user.id,
    });
    
    await syncData(tokenData.item_id);
  } catch (error) {
    console.log("Error exchanging public token", error);
    throw error;
  }
};
