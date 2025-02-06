import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const verifyUserEmail = async (userId: string) => {
  return await db
    .update(userTable)
    .set({
      emailVerified: true,
    })
    .where(eq(userTable.id, userId));
};
