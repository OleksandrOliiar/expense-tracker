"use server";

import { db } from "@/db";
import { goals } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

export const getUserGoals = async () => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    const userGoals = db
      .select()
      .from(goals)
      .where(eq(goals.userId, user.id));

    return userGoals;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user goals");
  }
}; 