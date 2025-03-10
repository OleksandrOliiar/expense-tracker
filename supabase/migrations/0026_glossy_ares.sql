ALTER TABLE "plaid_accounts" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "plaid_accounts" ADD COLUMN "plaid_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "plaid_accounts" ADD CONSTRAINT "plaid_accounts_plaid_id_unique" UNIQUE("plaid_id");