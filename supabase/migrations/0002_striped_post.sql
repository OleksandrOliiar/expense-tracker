ALTER TYPE "subscription_status" ADD VALUE 'incomplete';--> statement-breakpoint
ALTER TYPE "subscription_status" ADD VALUE 'incomplete_expired';--> statement-breakpoint
ALTER TYPE "subscription_status" ADD VALUE 'paused';--> statement-breakpoint
ALTER TYPE "subscription_status" ADD VALUE 'trialing';