-- Lead capture table
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  grade text,
  subject text,
  source text default 'website',          -- which page/form they came from
  status text not null default 'new',     -- new | contacted | booked | lost
  notes text,
  -- follow-up email tracking
  follow_up_1_sent_at timestamptz,        -- day 1 welcome (sent immediately)
  follow_up_2_sent_at timestamptz,        -- day 3 nudge
  follow_up_3_sent_at timestamptz         -- day 7 last call
);

-- Index for cron follow-up queries
create index if not exists leads_follow_up_idx on leads (created_at, follow_up_2_sent_at, follow_up_3_sent_at);
create index if not exists leads_status_idx on leads (status);

-- RLS: only service role can read/write (admin only)
alter table leads enable row level security;
create policy "Service role only" on leads using (false) with check (false);
