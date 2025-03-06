import { categories, subscriptions, transactions } from "./schema";

export type Category = typeof categories.$inferSelect;

export type CreateSubscriptionProps = typeof subscriptions.$inferInsert;

export type CreateTransactionProps = typeof transactions.$inferInsert;

export type Transaction = typeof transactions.$inferSelect;
