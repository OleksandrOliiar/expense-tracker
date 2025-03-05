"use server";

import { db } from "@/db";
import { goals } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq, like } from "drizzle-orm";

type GetUserGoalsProps = {
  name?: string;
};

export const getUserGoals = async ({ name }: GetUserGoalsProps) => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    const query = db
      .select()
      .from(goals)
      .where(eq(goals.userId, user.id))
      .$dynamic();

    if (name && name.trim() !== "") {
      query.where(like(goals.title, `%${name}%`));
    }

    const userGoals = await query;

    return userGoals;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user goals");
  }
};
