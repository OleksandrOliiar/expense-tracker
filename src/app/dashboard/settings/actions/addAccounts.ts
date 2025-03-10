import { db } from "@/db";
import { plaidAccounts } from "@/db/schema";
import { plaidClient } from "@/lib/plaid";

export const addAccounts = async (accessToken: string, itemId: string) => {
  try {
    const accounts = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const newAccounts = accounts.data.accounts.map((account) => ({
      id: crypto.randomUUID(),
      itemId,
      name: account.name,
      type: account.type,
      plaidId: account.account_id,
    }));

    await db
      .insert(plaidAccounts)
      .values(newAccounts)
      .onConflictDoNothing({
        target: [plaidAccounts.plaidId],
      });
  } catch (error) {
    console.log("Failed to add accounts", error);
    throw error;
  }
};
