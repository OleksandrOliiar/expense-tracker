"use server";

import { db } from "@/db";
import { transactions, categories, budgets, goals } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { and, eq, gte, lte, sql, desc, sum, lt, gt } from "drizzle-orm";
import {
  startOfMonth,
  endOfMonth,
  subMonths,
  format,
  subDays,
  parseISO,
} from "date-fns";

type Period = {
  startDate: Date;
  endDate: Date;
};

export const getDashboardSummary = async (
  startDateParam?: string,
  endDateParam?: string,
  dateParam?: string
) => {
  try {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }

    const user = await getUser();

    // Determine the date range to use (custom or default)
    let currentPeriod: Period;
    let previousPeriod: Period;

    if (dateParam) {
      // Single date mode
      const selectedDate = parseISO(dateParam);
      const prevDate = subDays(selectedDate, 30); // Compare with 30 days before

      currentPeriod = {
        startDate: prevDate,
        endDate: selectedDate,
      };

      previousPeriod = {
        startDate: subDays(prevDate, 30),
        endDate: prevDate,
      };
    } else if (startDateParam && endDateParam) {
      // Date range mode
      const startDate = parseISO(startDateParam);
      const endDate = parseISO(endDateParam);

      // Calculate the duration in days
      const durationInDays = Math.round(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      currentPeriod = {
        startDate,
        endDate,
      };

      previousPeriod = {
        startDate: subDays(startDate, durationInDays),
        endDate: subDays(endDate, durationInDays),
      };
    } else {
      // Default: current month and previous month
      const currentMonth = new Date();
      currentPeriod = {
        startDate: startOfMonth(currentMonth),
        endDate: endOfMonth(currentMonth),
      };

      const previousMonth = subMonths(currentMonth, 1);
      previousPeriod = {
        startDate: startOfMonth(previousMonth),
        endDate: endOfMonth(previousMonth),
      };
    }

    // Get summary data
    const [
      recentTransactions,
      monthlyBalance,
      categorySpending,
      activeBudgets,
      activeGoals,
    ] = await Promise.all([
      getRecentTransactions(user.id),
      getMonthlyBalance(user.id, currentPeriod, previousPeriod),
      getCategorySpending(user.id, currentPeriod),
      getActiveBudgets(user.id),
      getActiveGoals(user.id),
    ]);

    return {
      recentTransactions,
      monthlyBalance,
      categorySpending,
      activeBudgets,
      activeGoals,
      period: {
        current: {
          startDate: format(currentPeriod.startDate, "LLL dd, y"),
          endDate: format(currentPeriod.endDate, "LLL dd, y"),
        },
        previous: {
          startDate: format(previousPeriod.startDate, "LLL dd, y"),
          endDate: format(previousPeriod.endDate, "LLL dd, y"),
        },
      },
    };
  } catch (error) {
    console.error("Failed to get dashboard summary", error);
    throw new Error("Failed to get dashboard summary");
  }
};

// Get 5 most recent transactions
const getRecentTransactions = async (userId: string) => {
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
const getMonthlyBalance = async (
  userId: string,
  currentPeriod: Period,
  previousPeriod: Period
) => {
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
const getCategorySpending = async (userId: string, period: Period) => {
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
const getActiveBudgets = async (userId: string) => {
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

// Get active goals with their progress
const getActiveGoals = async (userId: string) => {
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
