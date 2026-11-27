-- Create a profile and baseline member role after Supabase Auth creates a user.
-- Role elevation must only be performed by an authorized owner workflow.

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    nullif(new.raw_user_meta_data ->> 'full_name', ''),
    nullif(new.phone, '')
  )
  on conflict (id) do nothing;

  insert into public.role_assignments (user_id, location_id, role)
  values (new.id, null, 'member')
  on conflict (user_id, location_id, role) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_kinetic on auth.users;
create trigger on_auth_user_created_kinetic
after insert on auth.users
for each row execute procedure public.handle_new_auth_user();
