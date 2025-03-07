"use server";

import { db } from "@/db";
import { plaidAccounts, plaidItems } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq, like, sql } from "drizzle-orm";

export const getUserBanks = async (name?: string) => {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("User is not authenticated");
    }

    const user = await getUser();

    const banks = db
      .select({
        id: plaidItems.id,
        itemId: plaidItems.itemId,
        bankName: plaidItems.bankName,
        logo: plaidItems.logo,
        url: plaidItems.url,
        accountsCount: sql<number>`CAST(COUNT(${plaidAccounts.id}) AS INTEGER)`,
      })
      .from(plaidItems)
      .leftJoin(plaidAccounts, eq(plaidAccounts.itemId, plaidItems.id))
      .groupBy(plaidItems.id)
      .where(eq(plaidItems.accountId, user.id))
      .$dynamic();

    if (name && name.trim() !== "") {
      banks.where(like(plaidItems.bankName, `%${name}%`));
    }

    const result = await banks;

    return result;
  } catch (error) {
    console.log("Error getting user banks", error);
    throw error;
  }
};

export type UserBank = {
  id: string;
  itemId: string;
  bankName: string | null;
  logo: string | null;
  url: string | null;
  accountsCount: number;
};
