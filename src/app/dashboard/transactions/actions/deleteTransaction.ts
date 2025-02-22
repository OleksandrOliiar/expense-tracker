"use server";

import { db } from "@/db";
import { transactions } from "@/db/schema";
import { qstashClient } from "@/lib/qstash";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

export const deleteTransaction = async (id: string) => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    await db.delete(transactions).where(eq(transactions.id, id));

    await qstashClient.publishJSON({
      url: `https://c05c-213-109-224-158.ngrok-free.app/api/tracker`,
      body: { userId: user.id },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
