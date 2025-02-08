DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('income', 'expense');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "type" "type" NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "type" "type" NOT NULL;