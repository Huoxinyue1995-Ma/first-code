import postgres from "postgres";

declare global {
  var imageReadySql: postgres.Sql | undefined;
}

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not configured.");
    this.name = "DatabaseNotConfiguredError";
  }
}

function databaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
}

export function isDatabaseConfigured() {
  return Boolean(databaseUrl());
}

// One shared, small connection pool per server instance. Serverless functions should keep this low.
export function getSql() {
  const url = databaseUrl();
  if (!url) throw new DatabaseNotConfiguredError();
  if (!globalThis.imageReadySql) {
    const isLocal = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
    globalThis.imageReadySql = postgres(url, {
      max: 3,
      idle_timeout: 20,
      connect_timeout: 10,
      // Pooled serverless endpoints (Neon, Supabase) do not support prepared statements reliably.
      prepare: false,
      ssl: isLocal ? false : "require",
    });
  }
  return globalThis.imageReadySql;
}
