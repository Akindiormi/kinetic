# KINETIC

A connected gym platform for members, trainers, staff, and gym management.

## Product direction

KINETIC is a supportive fitness companion, a practical workspace for staff, and a business tool for gym management. The supplied concept proposal is a working draft, not a final feature commitment. Policies and optional capabilities must remain configurable until approved by the gym owner.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- PostgreSQL / Supabase (planned)
- Versioned API for future web and Flutter clients (planned)

## Getting started

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

Copy `.env.example` to `.env.local` and provide credentials as integrations are implemented. Never commit secrets.

## Project principles

- Follow the owner-approved scope; see `OPEN_QUESTIONS.md`.
- Do not hardcode gym policies such as cancellations, pauses, rewards, access tiers, or notification rules.
- Keep member communication supportive and non-judgmental.
- Preserve in-person gym services and staff assistance.
- Apply least-privilege access and privacy by design.
- Label all seeded/demo metrics as sample data.

## Current status

Initial public-site foundation. Backend, authentication, role permissions, payments, and operational workflows are not yet implemented.
