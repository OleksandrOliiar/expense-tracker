import { db } from "@/db";
import { plaidItems } from "@/db/schema";

type CreateItemProps = {
  itemId: string;
  userId: string;
  accessToken: string;
  institutionId: string;
  logo?: string | null;
  url?: string | null;
  institutionName: string;
};

export const createItem = async ({
  itemId,
  userId,
  accessToken,
  institutionId,
  logo,
  url,
  institutionName,
}: CreateItemProps) => {
  try {
    await db
      .insert(plaidItems)
      .values({
        id: crypto.randomUUID(),
        itemId,
        accessToken,
        accountId: userId,
        institutionId,
        logo,
        url,
        bankName: institutionName,
      })
      .onConflictDoUpdate({
        target: [plaidItems.institutionId],
        set: {
          itemId,
          accessToken,
        },
      });
  } catch (error) {
    console.log("Error creating item", error);
    throw error;
  }
};
