import { categories, subscriptions } from "./schema";

export type Category = typeof categories.$inferSelect;

export type CreateSubscriptionProps = typeof subscriptions.$inferInsert;
