import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// Enums
export const types = pgEnum("type", ["income", "expense"]);
export const subscriptionStatus = pgEnum("subscription_status", [
  "active",
  "canceled",
  "past_due",
  "unpaid",
  "incomplete",
  "incomplete_expired",
  "paused",
  "trialing",
]);

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey().unique(),
  plaidId: text("plaid_id"),
  kindeId: text("kinde_id").notNull(),
  stripeCustomerId: text("stripe_customer_id"),
});

export const accountsRelations = relations(accounts, ({ many }) => ({
  transactions: many(transactions),
  goals: many(goals),
  plaidItems: many(plaidItems),
}));

export const subscriptions = pgTable("subscriptions", {
  id: text("id").primaryKey(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  stripeProductId: text("stripe_product_id").notNull(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  status: subscriptionStatus("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  icon: text("icon"),
  userId: text("user_id").notNull(),
  type: types("type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
}));

export const plaidItems = pgTable("plaid_items", {
  id: text("id").primaryKey(),
  itemId: text("item_id").notNull(),
  accountId: text("account_id").references(() => accounts.id, {
    onDelete: "cascade",
  }),
  accessToken: text("access_token").notNull(),
  transactionCursor: text("transaction_cursor"),
  bankName: text("bank_name"),
  isActive: boolean("is_active").notNull().default(true),
});

export const plaidItemsRelations = relations(plaidItems, ({ one, many }) => ({
  account: one(accounts, {
    fields: [plaidItems.accountId],
    references: [accounts.id],
  }),
  accounts: many(plaidAccounts),
}));

export const plaidAccounts = pgTable("plaid_accounts", {
  id: text("id").primaryKey(),
  itemId: text("item_id").references(() => plaidItems.id, {
    onDelete: "cascade",
  }),
  name: text("name").notNull(),
});

export const plaidAccountsRelations = relations(plaidAccounts, ({ one }) => ({
  item: one(plaidItems, {
    fields: [plaidAccounts.itemId],
    references: [plaidItems.id],
  }),
}));

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  payee: text("payee").notNull(),
  notes: text("notes"),
  date: timestamp("date", { mode: "date" }).notNull(),
  userId: text("user_id").notNull(),
  categoryId: text("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  type: types("type").notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

// Goals Table
export const goals = pgTable("goals", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  targetAmount: numeric("target_amount", { precision: 10, scale: 2 }).notNull(),
  currentAmount: numeric("current_amount", { precision: 10, scale: 2 }).notNull().default('0'),
  startDate: text("start_date"),
  endDate: text("end_date"),
  isCompleted: boolean("is_completed").notNull().default(false),
  description: text("description"),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});