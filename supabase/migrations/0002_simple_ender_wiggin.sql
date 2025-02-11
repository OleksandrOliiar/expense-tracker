ALTER TABLE "categories" RENAME COLUMN "account_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "transactions" RENAME COLUMN "account_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_account_id_accounts_id_fk";
