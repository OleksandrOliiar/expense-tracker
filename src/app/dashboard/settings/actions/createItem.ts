import { db } from "@/db";
import { plaidItems } from "@/db/schema";

type CreateItemProps = {
  itemId: string;
  userId: string;
  accessToken: string;
};

export const createItem = async ({
  itemId,
  userId,
  accessToken,
}: CreateItemProps) => {
  try {
    await db.insert(plaidItems).values({
      id: crypto.randomUUID(),
      accessToken,
      accountId: userId,
      itemId,
    });
  } catch (error) {
    console.log("Error creating item", error);
    throw error;
  }
};
