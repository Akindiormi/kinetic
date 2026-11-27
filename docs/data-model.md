# KINETIC data model — initial backend foundation

This document describes the first database migration. It is not the complete target schema from the concept proposal; marketplace, orders, guest passes, referrals, rewards, workouts, trainer questions, announcements, feedback, and notifications are subsequent slices.

## Core entities

- **locations** — gym branches and their time zones.
- **profiles** — application profile linked to Supabase Auth.
- **role_assignments** — location-scoped member, trainer, reception, staff, management, and owner roles.
- **gym_settings / policy_settings** — owner-managed settings and configurable policy records. Avoid embedding gym policy decisions in application constants.
- **member_preferences** — goals, activities, experience, availability, and equipment preferences.
- **membership_plans / memberships / payments** — plan catalogue, member entitlement lifecycle, and payment records. Card details are not stored.
- **check_ins** — attendance events with method and staff attribution.
- **coach_profiles / classes / class_sessions** — public coach details and scheduled group sessions.
- **bookings / waitlist_entries** — member reservations and queue records.
- **staff_tasks** — operational work queue.
- **consents** — versioned consent evidence and withdrawal timestamps.
- **audit_log** — append-oriented record of sensitive staff/system actions.

## Security model

Row Level Security is enabled on the initial private tables. Member access is self-scoped. Staff and management access is granted through location-scoped role assignments. Role assignment writes and payment writes are intentionally not exposed to client sessions; trusted server-side workflows must perform them. The initial policies are a baseline and require security review before production.

## Follow-up schema slices

The concept proposal also calls for coach-client assignments and session notes, home routines and workouts, trainer questions, products and inventory, reservations and orders, referrals and rewards, guest visits, feedback, announcements, notifications, and scope-board decisions. Add these in separate migrations as their workflows and access rules are agreed.
