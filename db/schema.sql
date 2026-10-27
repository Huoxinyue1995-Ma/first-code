-- Image Ready accounts and credits schema.
-- Safe to run repeatedly: every statement is idempotent.

create table if not exists users (
  id uuid primary key,
  email text not null unique,
  name text,
  google_sub text unique,
  credit_balance integer not null default 0 check (credit_balance >= 0),
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

-- Login sessions. Only a SHA-256 hash of the cookie token is stored.
create table if not exists sessions (
  token_hash text primary key,
  user_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);
create index if not exists sessions_user_id_idx on sessions(user_id);
create index if not exists sessions_expires_at_idx on sessions(expires_at);

-- One-time email sign-in links. Only a hash of the link token is stored.
create table if not exists email_login_tokens (
  token_hash text primary key,
  email text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at timestamptz
);
create index if not exists email_login_tokens_email_idx on email_login_tokens(email, created_at);

-- Append-only record of every credit change. users.credit_balance always equals the sum of delta for that user.
create table if not exists credit_ledger (
  id bigserial primary key,
  user_id uuid not null references users(id) on delete cascade,
  delta integer not null check (delta <> 0),
  balance_after integer not null check (balance_after >= 0),
  reason text not null check (reason in ('signup_bonus', 'purchase', 'usage', 'refund', 'adjustment')),
  -- Unique per reason, so a Stripe session or usage job can never be applied twice.
  reference text,
  detail jsonb,
  created_at timestamptz not null default now()
);
create unique index if not exists credit_ledger_reason_reference_idx on credit_ledger(reason, reference) where reference is not null;
create index if not exists credit_ledger_user_id_idx on credit_ledger(user_id, created_at desc);

-- Photos a user has already paid to download, identified by a SHA-256 of the file computed in the browser.
-- The photo itself is never sent to the server. Lets a user re-export the same photo in other sizes without paying again.
create table if not exists paid_photos (
  user_id uuid not null references users(id) on delete cascade,
  fingerprint text not null check (fingerprint ~ '^[a-f0-9]{64}$'),
  job_id text not null,
  paid_at timestamptz not null default now(),
  primary key (user_id, fingerprint)
);
