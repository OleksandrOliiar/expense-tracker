import { db } from "@/db";
import { plaidItems } from "@/db/schema";
import { eq } from "drizzle-orm";

type AddBankForItemProps = {
  itemId: string;
  institutionName: string;
};

export const addBankForItem = async ({
  itemId,
  institutionName,
}: AddBankForItemProps) => {
  try {
    await db
      .update(plaidItems)
      .set({
        bankName: institutionName,
      })
      .where(eq(plaidItems.id, itemId));
  } catch (error) {
    console.log("Error adding bank for item", error);
    throw error;
  }
};
