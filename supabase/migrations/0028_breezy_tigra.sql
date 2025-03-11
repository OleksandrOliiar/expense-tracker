ALTER TABLE "subscriptions" ADD COLUMN "product_name" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "price_amount" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "currency" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "interval" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "current_period_start" timestamp;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "current_period_end" timestamp;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "cancel_at_period_end" boolean DEFAULT false;