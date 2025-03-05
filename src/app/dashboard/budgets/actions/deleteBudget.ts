"use server";

import { db } from "@/db";
import { budgets } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

export const deleteBudget = async (id: string) => {
  try {
    const { isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    await db.delete(budgets).where(eq(budgets.id, id));
  } catch (error) {
    console.error(error);
    throw error;
  }
};
