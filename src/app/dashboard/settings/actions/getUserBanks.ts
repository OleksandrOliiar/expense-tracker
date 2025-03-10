"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type GetUserBanksParams = {
  name?: string;
};

export const getUserBanks = async ({ name }: GetUserBanksParams) => {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("User is not authenticated");
    }

    const user = await getUser();

    const query = db.query.plaidItems.findMany({
      where: (items, { eq, and, ilike }) => {
        const conditions = [eq(items.accountId, user.id)];

        if (name && name.trim() !== "") {
          conditions.push(ilike(items.bankName, `%${name}%`));
        }

        return and(...conditions);
      },
      with: {
        accounts: true,
      },
      columns: {
        id: true,
        itemId: true,
        bankName: true,
        logo: true,
        url: true,
        isActive: true,
      },
    });

    const banks = await query;

    return banks;
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
  isActive: boolean;
  accounts: {
    id: string;
    name: string;
    type: string;
    plaidId: string;
  }[];
};
