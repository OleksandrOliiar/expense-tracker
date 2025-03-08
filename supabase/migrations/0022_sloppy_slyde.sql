ALTER TABLE "transactions" ALTER COLUMN "plaid_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN IF EXISTS "categories_synced";--> statement-breakpoint
ALTER TABLE "plaid_items" DROP COLUMN IF EXISTS "item_id";