-- KINETIC core schema
-- Apply with Supabase CLI after linking a project: supabase db push
-- Policies are deliberately data-driven: owner decisions belong in gym_settings / policy_settings.

create extension if not exists pgcrypto;

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  timezone text not null default 'America/New_York',
  address jsonb not null default '{}'::jsonb,
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  preferred_timezone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.role_assignments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  location_id uuid references public.locations(id) on delete cascade,
  role text not null check (role in ('member','trainer','reception','staff','management','owner')),
  created_at timestamptz not null default now(),
  unique nulls not distinct (user_id, location_id, role)
);

create table if not exists public.gym_settings (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references public.locations(id) on delete cascade,
  setting_key text not null,
  setting_value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now(),
  unique (location_id, setting_key)
);

create table if not exists public.policy_settings (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references public.locations(id) on delete cascade,
  policy_key text not null,
  enabled boolean not null default false,
  configuration jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now(),
  unique (location_id, policy_key)
);

create table if not exists public.member_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  goals jsonb not null default '[]'::jsonb,
  preferred_activities jsonb not null default '[]'::jsonb,
  experience_level text,
  available_time jsonb not null default '{}'::jsonb,
  equipment_preferences jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.membership_plans (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references public.locations(id) on delete cascade,
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  currency char(3) not null default 'USD',
  billing_interval text not null check (billing_interval in ('day','week','month','year','one_time')),
  is_active boolean not null default true,
  terms jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete restrict,
  plan_id uuid references public.membership_plans(id) on delete set null,
  location_id uuid references public.locations(id) on delete set null,
  status text not null default 'pending' check (status in ('pending','active','paused','past_due','cancelled','expired')),
  starts_at timestamptz,
  ends_at timestamptz,
  renewal_at timestamptz,
  external_customer_id text,
  external_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete restrict,
  membership_id uuid references public.memberships(id) on delete set null,
  location_id uuid references public.locations(id) on delete set null,
  amount_cents integer not null check (amount_cents >= 0),
  currency char(3) not null default 'USD',
  status text not null check (status in ('pending','succeeded','failed','refunded','cancelled')),
  provider text,
  provider_payment_id text,
  receipt_url text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.check_ins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete restrict,
  location_id uuid not null references public.locations(id) on delete restrict,
  method text not null check (method in ('qr','code','staff_search','manual','other')),
  checked_in_at timestamptz not null default now(),
  checked_in_by uuid references public.profiles(id) on delete set null,
  notes text
);

create table if not exists public.coach_profiles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  bio text,
  specialties jsonb not null default '[]'::jsonb,
  qualifications jsonb not null default '[]'::jsonb,
  is_public boolean not null default false
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references public.locations(id) on delete cascade,
  title text not null,
  description text,
  capacity integer check (capacity is null or capacity > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.class_sessions (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  coach_id uuid references public.profiles(id) on delete set null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  capacity_override integer check (capacity_override is null or capacity_override > 0),
  status text not null default 'scheduled' check (status in ('scheduled','cancelled','completed')),
  check (ends_at > starts_at)
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.class_sessions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'requested' check (status in ('requested','confirmed','cancelled','attended','no_show')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_id, user_id)
);

create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.class_sessions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  position integer not null check (position > 0),
  status text not null default 'waiting' check (status in ('waiting','offered','accepted','removed')),
  created_at timestamptz not null default now(),
  unique (session_id, user_id),
  unique (session_id, position)
);

create table if not exists public.staff_tasks (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references public.locations(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'new' check (status in ('new','in_progress','awaiting_someone','completed')),
  assigned_to uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  consent_type text not null,
  granted boolean not null,
  policy_version text,
  source text,
  recorded_at timestamptz not null default now(),
  withdrawn_at timestamptz
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  location_id uuid references public.locations(id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists memberships_user_status_idx on public.memberships(user_id, status);
create index if not exists payments_user_created_idx on public.payments(user_id, created_at desc);
create index if not exists check_ins_location_time_idx on public.check_ins(location_id, checked_in_at desc);
create index if not exists sessions_start_idx on public.class_sessions(starts_at);
create index if not exists bookings_user_status_idx on public.bookings(user_id, status);
create index if not exists tasks_location_status_idx on public.staff_tasks(location_id, status);

-- Security helper: checks role assignment without exposing the assignments table to clients.
create or replace function public.has_location_role(target_location uuid, allowed_roles text[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.role_assignments ra
    where ra.user_id = auth.uid()
      and ra.role = any(allowed_roles)
      and (ra.location_id = target_location or ra.location_id is null)
  );
$$;

alter table public.locations enable row level security;
alter table public.profiles enable row level security;
alter table public.role_assignments enable row level security;
alter table public.coach_profiles enable row level security;
alter table public.membership_plans enable row level security;
alter table public.waitlist_entries enable row level security;
alter table public.member_preferences enable row level security;
alter table public.memberships enable row level security;
alter table public.payments enable row level security;
alter table public.check_ins enable row level security;
alter table public.gym_settings enable row level security;
alter table public.policy_settings enable row level security;
alter table public.classes enable row level security;
alter table public.class_sessions enable row level security;
alter table public.bookings enable row level security;
alter table public.waitlist_entries enable row level security;
alter table public.staff_tasks enable row level security;
alter table public.consents enable row level security;
alter table public.audit_log enable row level security;

create policy "locations_active_read" on public.locations
for select using (is_active = true or public.has_location_role(id, array['management','owner','reception','staff']));
create policy "profiles_select_self_only" on public.profiles
for select using (id = auth.uid());
create policy "profiles_update_self" on public.profiles
for update using (id = auth.uid()) with check (id = auth.uid());

create policy "role_assignments_read_self_or_owner" on public.role_assignments
for select using (
  user_id = auth.uid()
  or public.has_location_role(location_id, array['management','owner'])
);

create policy "member_preferences_self_or_assigned_coach" on public.member_preferences
for select using (
  user_id = auth.uid()
  or exists (
    select 1 from public.role_assignments ra
    where ra.user_id = auth.uid() and ra.role in ('management','owner')
  )
);
create policy "member_preferences_self_write" on public.member_preferences
for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "memberships_self_or_authorized_staff" on public.memberships
for select using (
  user_id = auth.uid()
  or public.has_location_role(location_id, array['reception','management','owner'])
);
create policy "payments_self_or_management" on public.payments
for select using (
  user_id = auth.uid()
  or public.has_location_role(location_id, array['management','owner'])
);
create policy "check_ins_self_or_staff" on public.check_ins
for select using (
  user_id = auth.uid()
  or public.has_location_role(location_id, array['reception','management','owner'])
);
create policy "check_ins_staff_insert" on public.check_ins
for insert with check (
  user_id = auth.uid()
  or public.has_location_role(location_id, array['reception','management','owner'])
);

create policy "settings_read_authenticated" on public.gym_settings
for select to authenticated using (public.has_location_role(location_id, array['management','owner']));
create policy "settings_owner_manage" on public.gym_settings
for all to authenticated using (public.has_location_role(location_id, array['owner']))
with check (public.has_location_role(location_id, array['owner']));
create policy "policies_read_authenticated" on public.policy_settings
for select to authenticated using (public.has_location_role(location_id, array['management','owner']));
create policy "policies_owner_manage" on public.policy_settings
for all to authenticated using (public.has_location_role(location_id, array['owner']))
with check (public.has_location_role(location_id, array['owner']));

create policy "active_plans_public_read" on public.membership_plans
for select using (is_active = true or public.has_location_role(location_id, array['management','owner','reception']));
create policy "public_coach_profiles_read" on public.coach_profiles
for select using (is_public = true or user_id = auth.uid());
create policy "active_classes_public_read" on public.classes
for select using (is_active = true or public.has_location_role(location_id, array['management','owner','reception','staff']));
create policy "sessions_public_schedule_read" on public.class_sessions
for select using (
  exists (select 1 from public.classes c where c.id = class_id and c.is_active = true)
  or exists (
    select 1 from public.classes c
    where c.id = class_id and public.has_location_role(c.location_id, array['management','owner','reception','staff','trainer'])
  )
);
create policy "bookings_self_or_staff_read" on public.bookings
for select using (
  user_id = auth.uid()
  or exists (
    select 1 from public.class_sessions s join public.classes c on c.id = s.class_id
    where s.id = session_id and public.has_location_role(c.location_id, array['reception','management','owner','trainer'])
  )
);
create policy "bookings_self_insert" on public.bookings
for insert with check (user_id = auth.uid());
create policy "bookings_self_update" on public.bookings
for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "waitlist_self_or_staff_read" on public.waitlist_entries
for select using (
  user_id = auth.uid()
  or exists (
    select 1 from public.class_sessions s join public.classes c on c.id = s.class_id
    where s.id = session_id and public.has_location_role(c.location_id, array['reception','management','owner','trainer'])
  )
);
create policy "waitlist_self_insert" on public.waitlist_entries
for insert with check (user_id = auth.uid());

create policy "tasks_staff_read" on public.staff_tasks
for select using (public.has_location_role(location_id, array['reception','staff','management','owner']));
create policy "tasks_staff_update" on public.staff_tasks
for update using (public.has_location_role(location_id, array['reception','staff','management','owner']))
with check (public.has_location_role(location_id, array['reception','staff','management','owner']));
create policy "tasks_management_insert" on public.staff_tasks
for insert with check (public.has_location_role(location_id, array['management','owner']));

create policy "consents_self_read" on public.consents
for select using (user_id = auth.uid());
create policy "consents_self_insert" on public.consents
for insert with check (user_id = auth.uid());
create policy "audit_owner_read" on public.audit_log
for select using (public.has_location_role(location_id, array['owner']));
create policy "audit_authenticated_insert" on public.audit_log
for insert to authenticated with check (actor_id = auth.uid());

-- Deliberately no client-side policies for role assignment writes, payment writes,
-- or audit-log updates/deletes. These operations must go through trusted server code.
