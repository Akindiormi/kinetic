import { createClient } from "@/lib/supabase/server";

export type KineticRole = "member" | "trainer" | "reception" | "staff" | "management" | "owner";

export async function getCurrentUserRoles() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, roles: [] as KineticRole[] };

  const { data } = await supabase
    .from("role_assignments")
    .select("role")
    .eq("user_id", user.id);

  return {
    user,
    roles: (data ?? []).map((row) => row.role as KineticRole),
  };
}

export function hasAnyRole(roles: KineticRole[], allowed: KineticRole[]) {
  return roles.some((role) => allowed.includes(role));
}
