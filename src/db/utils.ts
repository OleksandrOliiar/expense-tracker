import { PgSelect } from "drizzle-orm/pg-core";

export function withPagination<T extends PgSelect>(
  qb: T,
  page: number,
  pageSize: number
) {
  return qb.limit(pageSize).offset((page - 1) * pageSize);
}
