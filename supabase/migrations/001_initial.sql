-- ============================================================
-- Join – Initial Schema
-- ============================================================

-- profiles (extends auth.users)
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  name       text not null default '',
  email      text not null default '',
  phone      text,
  color      text not null default '#29ABE2',
  is_guest   boolean not null default false,
  created_at timestamptz not null default now()
);

-- contacts (shared across all users)
create table if not exists public.contacts (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null default '',
  phone      text,
  color      text not null default '#29ABE2',
  created_at timestamptz not null default now()
);

-- tasks
create table if not exists public.tasks (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  category    text not null check (category in ('Technical Task', 'User Story')),
  priority    text not null check (priority in ('urgent', 'medium', 'low')) default 'medium',
  due_date    date not null,
  status      text not null check (status in ('todo', 'in-progress', 'awaiting-feedback', 'done')) default 'todo',
  position    integer not null default 0,
  created_at  timestamptz not null default now()
);

-- subtasks
create table if not exists public.subtasks (
  id         uuid primary key default gen_random_uuid(),
  task_id    uuid not null references public.tasks(id) on delete cascade,
  title      text not null,
  completed  boolean not null default false,
  position   integer not null default 0,
  created_at timestamptz not null default now()
);

-- task_contacts (junction)
create table if not exists public.task_contacts (
  task_id    uuid not null references public.tasks(id) on delete cascade,
  contact_id uuid not null references public.contacts(id) on delete cascade,
  primary key (task_id, contact_id)
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles      enable row level security;
alter table public.contacts      enable row level security;
alter table public.tasks         enable row level security;
alter table public.subtasks      enable row level security;
alter table public.task_contacts enable row level security;

-- All authenticated users share the same board → full access
create policy "authenticated full access" on public.profiles
  for all to authenticated using (true) with check (true);

create policy "authenticated full access" on public.contacts
  for all to authenticated using (true) with check (true);

create policy "authenticated full access" on public.tasks
  for all to authenticated using (true) with check (true);

create policy "authenticated full access" on public.subtasks
  for all to authenticated using (true) with check (true);

create policy "authenticated full access" on public.task_contacts
  for all to authenticated using (true) with check (true);

-- ============================================================
-- Auto-create profile on sign-up (including anonymous)
-- ============================================================

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, name, email, is_guest)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.email, ''),
    (new.raw_app_meta_data->>'provider' = 'anonymous')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
