import { db } from "@/db";
import { plaidItems } from "@/db/schema";
import { eq } from "drizzle-orm";

type AddBankForItemProps = {
  itemId: string;
  institutionName: string;
  logo?: string | null;
  url?: string | null;
};

export const addBankForItem = async ({
  itemId,
  institutionName,
  logo,
  url,
}: AddBankForItemProps) => {
  try {
    await db
      .update(plaidItems)
      .set({
        bankName: institutionName,
        logo,
        url,
      })
      .where(eq(plaidItems.itemId, itemId));
  } catch (error) {
    console.log("Error adding bank for item", error);
    throw error;
  }
};
