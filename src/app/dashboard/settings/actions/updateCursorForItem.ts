import { db } from "@/db";
import { eq } from "drizzle-orm";
import { plaidItems } from "@/db/schema";

type UpdateCursorForItemProps = {
  itemId: string;
  nextCursor: string;
};

export const updateCursorForItem = async ({
  itemId,
  nextCursor,
}: UpdateCursorForItemProps) => {
  try {
    await db
      .update(plaidItems)
      .set({
        transactionCursor: nextCursor,
      })
      .where(eq(plaidItems.itemId, itemId));
  } catch (error) {
    console.log("Failed to update cursor for item", error);
    throw error;
  }
};
