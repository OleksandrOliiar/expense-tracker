import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, userTable } from "@/db/schema"
import { db } from "@/db";

export const adapter = new DrizzleMySQLAdapter(db, sessionTable, userTable);