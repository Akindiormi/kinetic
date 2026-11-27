# Authentication and access foundation

## Included

- Supabase browser and server clients using cookie-based sessions.
- Middleware session refresh and protection for the authenticated `/app` area.
- Email/password registration and login screens.
- Email confirmation callback route.
- Server-rendered member landing page and sign-out action.
- Auth database trigger that creates a profile and assigns the baseline `member` role.
- Server-side role helper and protected staff and management landing pages.
- Owner-only SQL function to assign non-owner roles with audit logging.

## Configure locally

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Apply all three SQL migrations in timestamp order using Supabase CLI or SQL editor.
5. In Supabase Auth URL configuration, set the local site URL to `http://localhost:3000` and add `http://localhost:3000/auth/callback` to allowed redirect URLs.
6. Install packages and start the app.

## Security boundaries

- Client registration can create only a normal authenticated account. The database trigger assigns only the baseline member role.
- Never accept a role from registration form metadata.
- Do not expose the Supabase service-role key to the browser.
- The owner-only role assignment RPC cannot grant the owner role and writes an audit record.
- Role assignment, payment writes, and privileged membership operations must remain trusted server-side workflows with explicit authorization and audit logging.
- Review and test RLS policies against the final owner-approved permission matrix before production use.

## Known limitations

- This is an integration-ready scaffold, not a live connected auth deployment until Supabase environment values and migrations are configured.
- The role assignment function is available for an owner UI or trusted server action; that UI is not implemented yet.
- Email confirmation and password reset email templates still need gym-approved wording and redirect configuration.
- Member onboarding/profile editing and full staff operational tools are subsequent implementation slices.
