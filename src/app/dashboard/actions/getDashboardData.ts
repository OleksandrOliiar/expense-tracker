"use server";

import { db } from "@/db";
import { budgets, categories, goals, transactions } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { format } from "date-fns";
import { and, desc, eq, gt, gte, lt, lte, sql } from "drizzle-orm";

export type Period = {
  startDate: Date;
  endDate: Date;
};

const getUserId = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized");
  }

  const user = await getUser();
  return user.id;
};

// Get 5 most recent transactions
export const getRecentTransactions = async () => {
  const userId = await getUserId();

  return db
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
    .where(eq(transactions.userId, userId))
    .orderBy(desc(transactions.date))
    .limit(5);
};

// Get income, expenses and balance for current and previous months
export const getMonthlyBalance = async (
  currentPeriod: Period,
  previousPeriod: Period
) => {
  const userId = await getUserId();

  // Current month data
  const currentMonthIncome = await getTotalAmount(
    userId,
    currentPeriod,
    "income"
  );
  const currentMonthExpenses = await getTotalAmount(
    userId,
    currentPeriod,
    "expense"
  );
  const currentMonthBalance =
    Number(currentMonthIncome) - Number(currentMonthExpenses);

  // Previous month data
  const previousMonthIncome = await getTotalAmount(
    userId,
    previousPeriod,
    "income"
  );
  const previousMonthExpenses = await getTotalAmount(
    userId,
    previousPeriod,
    "expense"
  );
  const previousMonthBalance =
    Number(previousMonthIncome) - Number(previousMonthExpenses);

  // Calculate percentage changes
  const incomeChange = calculatePercentageChange(
    previousMonthIncome,
    currentMonthIncome
  );
  const expensesChange = calculatePercentageChange(
    previousMonthExpenses,
    currentMonthExpenses
  );
  const balanceChange = calculatePercentageChange(
    previousMonthBalance,
    currentMonthBalance
  );

  return {
    currentMonth: {
      income: currentMonthIncome,
      expenses: currentMonthExpenses,
      balance: currentMonthBalance.toString(),
      label: format(currentPeriod.startDate, "MMM yyyy"),
    },
    previousMonth: {
      income: previousMonthIncome,
      expenses: previousMonthExpenses,
      balance: previousMonthBalance.toString(),
      label: format(previousPeriod.startDate, "MMM yyyy"),
    },
    changes: {
      income: incomeChange,
      expenses: expensesChange,
      balance: balanceChange,
    },
  };
};

// Helper to calculate percentage change between two values
const calculatePercentageChange = (
  previous: string | number,
  current: string | number
) => {
  const prev = typeof previous === "string" ? Number(previous) : previous;
  const curr = typeof current === "string" ? Number(current) : current;

  if (prev === 0) return curr > 0 ? 100 : 0;

  return Number((((curr - prev) / Math.abs(prev)) * 100).toFixed(2));
};

// Get total amount for a specific period and type (income/expense)
const getTotalAmount = async (
  userId: string,
  period: Period,
  type: "income" | "expense"
) => {
  const condition =
    type === "income"
      ? gt(transactions.amount, "0")
      : lt(transactions.amount, "0");

  const result = await db
    .select({
      total: sql<string>`COALESCE(SUM(${transactions.amount}), 0)`,
    })
    .from(transactions)
    .where(
      and(
        eq(transactions.userId, userId),
        gte(transactions.date, period.startDate),
        lte(transactions.date, period.endDate),
        condition
      )
    );

  return type === "expense"
    ? (Number(result[0]?.total || 0) * -1).toString() // Make expenses positive
    : result[0]?.total || "0";
};

// Get spending by category for the current month
export const getCategorySpending = async (period: Period) => {
  const userId = await getUserId();

  const result = await db
    .select({
      categoryId: categories.id,
      categoryName: categories.name,
      categoryIcon: categories.icon,
      amount: sql<string>`ABS(COALESCE(SUM(${transactions.amount}), 0))`, // Using ABS to get positive values
    })
    .from(transactions)
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .where(
      and(
        eq(transactions.userId, userId),
        gte(transactions.date, period.startDate),
        lte(transactions.date, period.endDate),
        lt(transactions.amount, "0") // Only expenses
      )
    )
    .groupBy(categories.id)
    .having(sql`ABS(COALESCE(SUM(${transactions.amount}), 0)) > 0`)
    .orderBy(sql`ABS(COALESCE(SUM(${transactions.amount}), 0)) DESC`);

  return result;
};

// Get active budgets with their progress
export const getActiveBudgets = async () => {
  const userId = await getUserId();

  const currentDate = new Date();

  return db
    .select({
      id: budgets.id,
      title: budgets.title,
      currentAmount: budgets.currentAmount,
      targetAmount: budgets.targetAmount,
      startDate: budgets.startDate,
      endDate: budgets.endDate,
      category: {
        name: categories.name,
        id: categories.id,
        icon: categories.icon,
      },
    })
    .from(budgets)
    .leftJoin(categories, eq(budgets.categoryId, categories.id))
    .where(
      and(
        eq(budgets.userId, userId),
        lte(budgets.startDate, currentDate),
        gte(budgets.endDate, currentDate),
        eq(budgets.isCompleted, false)
      )
    )
    .limit(3);
};

export const getActiveGoals = async () => {
  const userId = await getUserId();

  const currentDate = new Date();

  return db
    .select({
      id: goals.id,
      title: goals.title,
      currentAmount: goals.currentAmount,
      targetAmount: goals.targetAmount,
      startDate: goals.startDate,
      endDate: goals.endDate,
      description: goals.description,
    })
    .from(goals)
    .where(
      and(
        eq(goals.userId, userId),
        lte(goals.startDate, currentDate),
        gte(goals.endDate, currentDate),
        eq(goals.isCompleted, false)
      )
    )
    .limit(3);
};
