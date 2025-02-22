"use server";

import { plaidClient } from "@/lib/plaid";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createItem } from "./createItem";
import { populateBankName } from "./populateBankName";
import { syncTransactions } from "./syncTransactions";

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

    await createItem({
      itemId: tokenData.item_id,
      userId: user.id,
      accessToken: tokenData.access_token,
    });

    await populateBankName({
      itemId: tokenData.item_id,
      accessToken: tokenData.access_token,
    });

    await syncTransactions(tokenData.item_id);
  } catch (error) {
    console.log("Error exchanging public token", error);
    throw error;
  }
};
