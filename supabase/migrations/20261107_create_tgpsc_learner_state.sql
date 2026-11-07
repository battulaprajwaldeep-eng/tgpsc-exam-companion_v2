-- TGPSC Exam Companion: one private progress document per authenticated user.
-- Run this migration in Supabase SQL Editor.
create table if not exists public.tgpsc_learner_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.tgpsc_learner_state enable row level security;
alter table public.tgpsc_learner_state force row level security;

revoke all on table public.tgpsc_learner_state from anon, authenticated;
grant select, insert, update, delete on table public.tgpsc_learner_state to authenticated;

drop policy if exists "Users read own TGPSC state" on public.tgpsc_learner_state;
create policy "Users read own TGPSC state"
  on public.tgpsc_learner_state for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users insert own TGPSC state" on public.tgpsc_learner_state;
create policy "Users insert own TGPSC state"
  on public.tgpsc_learner_state for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users update own TGPSC state" on public.tgpsc_learner_state;
create policy "Users update own TGPSC state"
  on public.tgpsc_learner_state for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users delete own TGPSC state" on public.tgpsc_learner_state;
create policy "Users delete own TGPSC state"
  on public.tgpsc_learner_state for delete to authenticated
  using ((select auth.uid()) = user_id);

create index if not exists tgpsc_learner_state_updated_at_idx
  on public.tgpsc_learner_state (updated_at desc);
