import { db } from "@/db";
import { plaidItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getPlaidItem = async (itemId: string) => {
  try {
    const plaidItem = await db.query.plaidItems.findFirst({
      where: eq(plaidItems.itemId, itemId),
    });

    return plaidItem;
  } catch (error) {
    console.log("Failed to get plaid item");
    throw error;
  }
};
