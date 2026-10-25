import "server-only";
import type postgres from "postgres";
import { getSql } from "@/lib/db";
import { SIGNUP_BONUS_CREDITS } from "@/lib/credits";

export type User = {
  id: string;
  email: string;
  name: string | null;
  creditBalance: number;
  createdAt: Date;
};

export type LedgerEntry = {
  id: string;
  delta: number;
  balanceAfter: number;
  reason: "signup_bonus" | "purchase" | "usage" | "refund" | "adjustment";
  reference: string | null;
  detail: Record<string, unknown> | null;
  createdAt: Date;
};

export class InsufficientCreditsError extends Error {
  balance: number;
  required: number;
  constructor(balance: number, required: number) {
    super("Not enough credits.");
    this.name = "InsufficientCreditsError";
    this.balance = balance;
    this.required = required;
  }
}

type UserRow = { id: string; email: string; name: string | null; credit_balance: number; created_at: Date };

function toUser(row: UserRow): User {
  return { id: row.id, email: row.email, name: row.name, creditBalance: row.credit_balance, createdAt: row.created_at };
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function getUserById(id: string) {
  const sql = getSql();
  const rows = await sql<UserRow[]>`select id, email, name, credit_balance, created_at from users where id = ${id}`;
  return rows[0] ? toUser(rows[0]) : null;
}

// Applies a credit change atomically. The user row is locked, so concurrent spends cannot overdraw.
// Returns null when (reason, reference) was already applied, which makes webhooks and retries idempotent.
async function applyCreditChange(
  tx: postgres.TransactionSql,
  userId: string,
  delta: number,
  reason: LedgerEntry["reason"],
  reference: string | null,
  detail: Record<string, unknown> | null,
) {
  if (reference) {
    const existing = await tx`select 1 from credit_ledger where reason = ${reason} and reference = ${reference}`;
    if (existing.length) return null;
  }

  const locked = await tx<{ credit_balance: number }[]>`select credit_balance from users where id = ${userId} for update`;
  if (!locked[0]) throw new Error("User not found.");
  const balanceAfter = locked[0].credit_balance + delta;
  if (balanceAfter < 0) throw new InsufficientCreditsError(locked[0].credit_balance, -delta);

  await tx`update users set credit_balance = ${balanceAfter} where id = ${userId}`;
  const inserted = await tx<{ id: string }[]>`
    insert into credit_ledger (user_id, delta, balance_after, reason, reference, detail)
    values (${userId}, ${delta}, ${balanceAfter}, ${reason}, ${reference}, ${detail ? tx.json(detail as postgres.JSONValue) : null})
    on conflict do nothing
    returning id`;
  // A concurrent request inserted the same reference first; roll this one back.
  if (!inserted.length) throw new DuplicateReferenceError();
  return { entryId: inserted[0].id, balanceAfter };
}

class DuplicateReferenceError extends Error {}

async function inTransaction<T>(fn: (tx: postgres.TransactionSql) => Promise<T>): Promise<T | null> {
  const sql = getSql();
  try {
    return (await sql.begin(fn)) as T;
  } catch (error) {
    if (error instanceof DuplicateReferenceError) return null;
    throw error;
  }
}

// Finds a user by email (and Google account when given) or creates one with the sign-up bonus.
export async function findOrCreateUser(input: { email: string; name?: string | null; googleSub?: string | null }) {
  const email = normalizeEmail(input.email);
  const sql = getSql();

  return sql.begin(async (tx) => {
    let rows: UserRow[] = [];
    if (input.googleSub) {
      rows = await tx<UserRow[]>`select id, email, name, credit_balance, created_at from users where google_sub = ${input.googleSub} for update`;
    }
    if (!rows.length) {
      rows = await tx<UserRow[]>`select id, email, name, credit_balance, created_at from users where email = ${email} for update`;
    }

    if (rows.length) {
      const user = rows[0];
      await tx`
        update users set
          last_login_at = now(),
          google_sub = coalesce(google_sub, ${input.googleSub ?? null}),
          name = coalesce(name, ${input.name ?? null})
        where id = ${user.id}`;
      return { user: toUser(user), created: false };
    }

    const id = crypto.randomUUID();
    await tx`
      insert into users (id, email, name, google_sub, last_login_at)
      values (${id}, ${email}, ${input.name ?? null}, ${input.googleSub ?? null}, now())`;
    if (SIGNUP_BONUS_CREDITS > 0) {
      await applyCreditChange(tx, id, SIGNUP_BONUS_CREDITS, "signup_bonus", `signup:${id}`, null);
    }
    const created = await tx<UserRow[]>`select id, email, name, credit_balance, created_at from users where id = ${id}`;
    return { user: toUser(created[0]), created: true };
  });
}

// Adds purchased credits. `reference` must be the Stripe Checkout Session id so a purchase is credited once.
export async function grantPurchasedCredits(userId: string, credits: number, reference: string, detail: Record<string, unknown>) {
  return inTransaction((tx) => applyCreditChange(tx, userId, credits, "purchase", reference, detail));
}

// Reserves credits before running a paid job. `jobId` must be unique per job.
export async function spendCredits(userId: string, credits: number, jobId: string, detail: Record<string, unknown>) {
  return inTransaction((tx) => applyCreditChange(tx, userId, -credits, "usage", jobId, detail));
}

// Returns the credits of a failed job. Only refunds an existing charge, and at most once.
export async function refundCredits(userId: string, jobId: string, detail: Record<string, unknown> = {}) {
  return inTransaction(async (tx) => {
    const charges = await tx<{ delta: number }[]>`
      select delta from credit_ledger where user_id = ${userId} and reason = 'usage' and reference = ${jobId}`;
    if (!charges.length) return null;
    return applyCreditChange(tx, userId, -charges[0].delta, "refund", jobId, detail);
  });
}

export async function getLedger(userId: string, limit = 50) {
  const sql = getSql();
  const rows = await sql<{
    id: string; delta: number; balance_after: number; reason: LedgerEntry["reason"];
    reference: string | null; detail: Record<string, unknown> | null; created_at: Date;
  }[]>`
    select id, delta, balance_after, reason, reference, detail, created_at
    from credit_ledger where user_id = ${userId}
    order by created_at desc, id desc limit ${limit}`;
  return rows.map((row): LedgerEntry => ({
    id: String(row.id),
    delta: row.delta,
    balanceAfter: row.balance_after,
    reason: row.reason,
    reference: row.reference,
    detail: row.detail,
    createdAt: row.created_at,
  }));
}
