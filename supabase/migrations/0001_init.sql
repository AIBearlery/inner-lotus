-- Inner Lotus — initial schema
--
-- Every table is scoped to the authenticated (anonymous) user via RLS.
-- The app ships the Supabase publishable/anon key inside the client bundle, so
-- Row Level Security is the ENTIRE security boundary: without these policies any
-- holder of the anon key could read every row. Policies use `(select auth.uid())`
-- so the value is evaluated once per query, not once per row (Supabase perf guidance).

-- ---------------------------------------------------------------------------
-- profiles: one row per user, keyed by auth.uid(). Holds display name, timezone,
-- and which of the three daily check-in windows are enabled.
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  timezone text,
  morning_enabled boolean not null default true,
  midday_enabled boolean not null default true,
  evening_enabled boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using ((select auth.uid()) = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check ((select auth.uid()) = id);
create policy "profiles_update_own" on public.profiles
  for update using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "profiles_delete_own" on public.profiles
  for delete using ((select auth.uid()) = id);

-- ---------------------------------------------------------------------------
-- check_ins: the morning two-step pick (energy + purpose), one per user per day.
-- ---------------------------------------------------------------------------
create table public.check_ins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null,
  energy text not null,
  purpose text not null,
  created_at timestamptz not null default now(),
  unique (user_id, date)
);

create index check_ins_user_date_idx on public.check_ins (user_id, date desc);

alter table public.check_ins enable row level security;

create policy "check_ins_select_own" on public.check_ins
  for select using ((select auth.uid()) = user_id);
create policy "check_ins_insert_own" on public.check_ins
  for insert with check ((select auth.uid()) = user_id);
create policy "check_ins_update_own" on public.check_ins
  for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "check_ins_delete_own" on public.check_ins
  for delete using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- meditation_completions: a log row each time a session is completed.
-- meditation_id is a free text id matching the static content library (no FK).
-- ---------------------------------------------------------------------------
create table public.meditation_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  meditation_id text not null,
  check_in_id uuid references public.check_ins (id) on delete set null,
  completed_at timestamptz not null default now(),
  duration_listened_sec integer
);

create index meditation_completions_user_idx on public.meditation_completions (user_id, completed_at desc);

alter table public.meditation_completions enable row level security;

create policy "meditation_completions_select_own" on public.meditation_completions
  for select using ((select auth.uid()) = user_id);
create policy "meditation_completions_insert_own" on public.meditation_completions
  for insert with check ((select auth.uid()) = user_id);
create policy "meditation_completions_update_own" on public.meditation_completions
  for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "meditation_completions_delete_own" on public.meditation_completions
  for delete using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- chat_sessions: one evening (or other kind) conversation per user per day.
-- ---------------------------------------------------------------------------
create table public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null,
  kind text not null default 'evening',
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (user_id, date, kind)
);

create index chat_sessions_user_date_idx on public.chat_sessions (user_id, date desc);

alter table public.chat_sessions enable row level security;

create policy "chat_sessions_select_own" on public.chat_sessions
  for select using ((select auth.uid()) = user_id);
create policy "chat_sessions_insert_own" on public.chat_sessions
  for insert with check ((select auth.uid()) = user_id);
create policy "chat_sessions_update_own" on public.chat_sessions
  for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "chat_sessions_delete_own" on public.chat_sessions
  for delete using ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- chat_messages: each bubble in a conversation. user_id is denormalized so RLS
-- stays a simple per-row check without a join. Gratitude has no separate table —
-- it is just rows with message_type in the gratitude_* values.
-- ---------------------------------------------------------------------------
create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null check (role in ('amelie', 'user')),
  message_type text not null check (message_type in (
    'reflection_prompt', 'reflection_reply',
    'gratitude_prompt', 'gratitude_reply',
    'acknowledgment'
  )),
  content text not null,
  sort_order integer not null,
  created_at timestamptz not null default now()
);

create index chat_messages_session_idx on public.chat_messages (session_id, sort_order);
create index chat_messages_user_idx on public.chat_messages (user_id);

alter table public.chat_messages enable row level security;

create policy "chat_messages_select_own" on public.chat_messages
  for select using ((select auth.uid()) = user_id);
create policy "chat_messages_insert_own" on public.chat_messages
  for insert with check ((select auth.uid()) = user_id);
create policy "chat_messages_update_own" on public.chat_messages
  for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "chat_messages_delete_own" on public.chat_messages
  for delete using ((select auth.uid()) = user_id);
