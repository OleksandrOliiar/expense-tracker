ALTER TABLE "transactions" RENAME COLUMN "item_id" TO "account_id";--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_item_id_plaid_items_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_plaid_items_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."plaid_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
