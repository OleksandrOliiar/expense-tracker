ALTER TABLE "plaid_items" ADD COLUMN "institution_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "plaid_id" text;