"use server";

import { db } from "@/db";
import { plaidItems } from "@/db/schema";
import { plaidClient } from "@/lib/plaid";
import { eq } from "drizzle-orm";

export const deactivateBank = async (itemId: string) => {
  try {
    const bank = await db
      .select()
      .from(plaidItems)
      .where(eq(plaidItems.itemId, itemId));

    if (bank.length === 0) {
      throw new Error("Bank not found");
    }

    const { accessToken } = bank[0];

    await plaidClient.itemRemove({
      access_token: accessToken,
    });

    await db.delete(plaidItems).where(eq(plaidItems.itemId, itemId));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to deactivate bank");
  }
};
