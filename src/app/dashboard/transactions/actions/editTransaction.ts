"use server";

import { transactions } from "@/db/schema";
import {
  editTransactionSchema,
  EditTransactionSchema,
} from "../validations/editTransactionSchema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { qstashClient } from "@/lib/qstash";

export const editTransaction = async (data: EditTransactionSchema) => {
  const result = editTransactionSchema.safeParse(data);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  const { id, ...rest } = result.data;

  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    const result = await db
      .update(transactions)
      .set({
        ...rest,
        amount: rest.amount.toString(),
      })
      .where(eq(transactions.id, id));

    await qstashClient.publishJSON({
      url: `${process.env.APP_URL}/api/tracker`,
      body: {
        transactionId: id,
        userId: user.id,
        type: "edit",
      },
    });

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to edit transaction");
  }
};
