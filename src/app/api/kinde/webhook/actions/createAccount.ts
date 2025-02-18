import { db } from "@/db";
import { accounts } from "@/db/schema";

export const createAccount = async (kindeId: string) => {
  try {
    const account = await db.insert(accounts).values({
      id: kindeId,
      kindeId,
    });

    return account;
  } catch (error) {
    console.error(error);
    throw new Error("failed to create account");
  }
};
