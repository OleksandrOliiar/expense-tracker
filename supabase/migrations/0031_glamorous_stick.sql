ALTER TABLE "transactions" DROP CONSTRAINT "transactions_account_id_plaid_items_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_plaid_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."plaid_accounts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
