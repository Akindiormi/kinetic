-- Owner-only role assignment RPC.
-- It deliberately cannot grant the owner role; owner transfer requires a separate reviewed process.

create or replace function public.assign_location_role(
  target_user_id uuid,
  target_location_id uuid,
  new_role text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if new_role not in ('trainer','reception','staff','management','member') then
    raise exception 'Unsupported role';
  end if;

  if not public.has_location_role(target_location_id, array['owner']) then
    raise exception 'Only an owner for this location can assign roles';
  end if;

  if not exists (select 1 from public.profiles p where p.id = target_user_id) then
    raise exception 'Target user profile not found';
  end if;

  insert into public.role_assignments (user_id, location_id, role)
  values (target_user_id, target_location_id, new_role)
  on conflict (user_id, location_id, role) do nothing;

  insert into public.audit_log (actor_id, location_id, action, resource_type, resource_id, metadata)
  values (
    auth.uid(),
    target_location_id,
    'role.assigned',
    'role_assignment',
    target_user_id::text,
    jsonb_build_object('role', new_role)
  );
end;
$$;

revoke all on function public.assign_location_role(uuid, uuid, text) from public;
grant execute on function public.assign_location_role(uuid, uuid, text) to authenticated;
