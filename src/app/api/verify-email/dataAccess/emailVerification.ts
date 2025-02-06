import { db } from "@/db";
import { emailVerificationTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getVerificationByCode = async (code: string) => {
  return await db.query.emailVerification.findFirst({
    where: ({ code: dbCode }, { eq }) => eq(dbCode, code),
  });
};

export const deleteVerificiationCode = async (id: string) => {
  return await db
    .delete(emailVerificationTable)
    .where(eq(emailVerificationTable.id, id));
};
