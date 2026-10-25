// Applies db/schema.sql to the database in DATABASE_URL (or POSTGRES_URL).
// Usage: DATABASE_URL=postgres://... node scripts/migrate.mjs
import { readFile } from "node:fs/promises";
import postgres from "postgres";

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!url) {
  console.error("Set DATABASE_URL (or POSTGRES_URL) first.");
  process.exit(1);
}

const isLocal = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
const sql = postgres(url, { max: 1, ssl: isLocal ? false : "require", prepare: false, onnotice: () => {} });
const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");

try {
  await sql.unsafe(schema);
  const tables = await sql`select table_name from information_schema.tables where table_schema = 'public' order by 1`;
  console.log("Schema applied. Tables:", tables.map((row) => row.table_name).join(", "));
} finally {
  await sql.end();
}
