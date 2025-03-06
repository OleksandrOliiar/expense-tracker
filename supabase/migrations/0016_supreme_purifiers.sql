-- Custom migration to properly convert date fields
ALTER TABLE "goals" 
  ALTER COLUMN "start_date" TYPE timestamp without time zone 
  USING "start_date"::timestamp without time zone,
  ALTER COLUMN "end_date" TYPE timestamp without time zone 
  USING "end_date"::timestamp without time zone;

ALTER TABLE "budgets" 
  ALTER COLUMN "start_date" TYPE timestamp without time zone 
  USING "start_date"::timestamp without time zone,
  ALTER COLUMN "end_date" TYPE timestamp without time zone 
  USING "end_date"::timestamp without time zone;