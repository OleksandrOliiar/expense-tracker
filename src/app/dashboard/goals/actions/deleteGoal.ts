"use server";

import { db } from "@/db";
import { goals } from "@/db/schema";
import { qstashClient } from "@/lib/qstash";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

export const deleteGoal = async (id: string) => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    await db.delete(goals).where(eq(goals.id, id));
  } catch (error) {
    console.error(error);
    throw error;
  }
}; 