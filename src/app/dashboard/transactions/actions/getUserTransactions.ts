"use server";

import { db } from "@/db";
import { categories, transactions } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { asc, count, desc, eq, gte, ilike, inArray, lte } from "drizzle-orm";

type GetUserTransactionsProps = {
  name: string | null;
  startDate: string | null;
  endDate: string | null;
  categories: string | null;
  type: "all" | "income" | "expense" | null;
  date: string | null;
  page?: number;
  perPage?: number;
  sort?: { id: string; desc: boolean }[];
};

export const getUserTransactions = async ({
  name,
  startDate,
  endDate,
  categories: categoriesString,
  type,
  date,
  page = 0,
  perPage = 10,
  sort,
}: GetUserTransactionsProps) => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    const query = db
      .select({
        id: transactions.id,
        amount: transactions.amount,
        name: transactions.name,
        date: transactions.date,
        category: {
          name: categories.name,
          id: categories.id,
          icon: categories.icon,
        },
      })
      .from(transactions)
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .groupBy(categories.id, transactions.id)
      .$dynamic();

    query.where(eq(transactions.userId, user.id));

    if (name && name.trim() !== "") {
      query.where(ilike(transactions.name, `%${name}%`));
    }

    if (startDate) {
      query.where(gte(transactions.date, new Date(startDate)));
    }

    if (endDate) {
      query.where(lte(transactions.date, new Date(endDate)));
    }

    if (categoriesString) {
      const categoriesArr = categoriesString.split(",");
      query.where(inArray(transactions.categoryId, categoriesArr));
    }

    if (type && type === "expense") {
      query.where(lte(transactions.amount, "0"));
    } else if (type && type === "income") {
      query.where(gte(transactions.amount, "0"));
    }

    if (date) {
      query.where(eq(transactions.date, new Date(date)));
    }

    if (sort && sort.length > 0) {
      console.log(sort);
      
      const currentSort = sort[0];
      const orderFn = currentSort.desc ? desc : asc;
      const sortField = currentSort.id as "date" | "amount" | "name";
      query.orderBy(orderFn(transactions[sortField]));
    }

    query.limit(perPage).offset(page * perPage);

    const transactionsCount = db.select({ count: count() }).from(transactions);

    const [data, total] = await Promise.all([query, transactionsCount]);

    return {
      data,
      totalPages: Math.ceil(total[0].count / perPage),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user transactions");
  }
};
