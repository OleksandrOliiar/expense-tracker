ALTER TABLE "goals" ALTER COLUMN "target_amount" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "goals" ALTER COLUMN "current_amount" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "goals" ALTER COLUMN "current_amount" SET DEFAULT '0';