CREATE TABLE IF NOT EXISTS "magic_link" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "magic_link" ADD CONSTRAINT "magic_link_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
