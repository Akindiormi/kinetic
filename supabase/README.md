# Supabase setup

1. Create a Supabase project for KINETIC.
2. Install the Supabase CLI locally.
3. Run `supabase link --project-ref YOUR_PROJECT_REF`.
4. Review the SQL migration before applying it.
5. Run `supabase db push`.
6. Configure local environment variables using `.env.example`.

Do not commit service-role keys. Keep privileged database actions in server-only code. Review all RLS policies with the owner-approved role and workflow matrix before using real member data.
