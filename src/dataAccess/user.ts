import { db } from "@/db";

export const getUserByEmail = async (email: string) => {
  const user = await db.query.user.findFirst({
    where: ({ email: existingEmail }, { eq }) => eq(existingEmail, email),
  });

  return user;
};
