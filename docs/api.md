# KINETIC API

The web app and a future Flutter client will use the same versioned API surface.

## Base path

`/api/v1`

## Health

`GET /api/v1/health`

Example response:

```json
{
  "data": {
    "service": "kinetic-api",
    "status": "ok",
    "version": "v1",
    "timestamp": "2026-11-27T00:00:00.000Z",
    "dependencies": {
      "database": "not_configured",
      "payments": "not_configured",
      "messaging": "not_configured"
    }
  }
}
```

The health endpoint reports application availability only. It does not claim that external services are connected.

## API conventions

- JSON request and response bodies.
- Authentication through Supabase Auth access tokens once configured.
- Authorization must be enforced server-side and by database RLS.
- Use ISO 8601 timestamps; store instants in UTC and render in the location/member timezone.
- Use integer minor currency units (for example, cents) and ISO 4217 currency codes.
- Never return payment secrets, provider credentials, or unnecessary personal data.
- Return structured errors with a stable machine-readable code and a human-readable message.
- Add pagination to collection endpoints and validate all input at the server boundary.

## Planned resource groups

These are design targets, not implemented endpoints yet: profiles and preferences, membership and payments, check-ins, classes and bookings, coach questions, home routines, marketplace, guest visits, referrals, staff tasks, and owner settings.
