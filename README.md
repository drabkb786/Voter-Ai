# Voter-Ai

A modern student election voting platform designed around verified student access, configurable CR/GR elections, one-time voting, privacy-preserving ballot storage, CSV roster import, admin controls, and result publishing.

## Product goals

- Verify voters by exact Roll Number + CNIC match from the imported student roster.
- Allow admins to enable/disable voting eligibility per student.
- Configure CR and GR candidate pools separately.
- Allow exactly one CR vote and one GR vote per eligible voter.
- Prevent vote changes after submission.
- Keep voter identity separate from ballot choices in the application architecture.
- Support scheduled elections and automatic opening/closing based on configured times.
- Allow admins to review participation metrics without exposing voter choice mappings.
- Publish final results only when the admin explicitly releases them.

## Suggested stack for Lovable

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase Auth + Postgres + Storage
- Papa Parse for CSV parsing
- Recharts for admin analytics

## Important production note

This repository contains the product foundation and UI direction. A production election should use a real backend with server-side authorization, database constraints, audit logging, TLS, secure secret management, and a privacy-preserving ballot model. Do not rely on client-side checks for eligibility or one-vote enforcement.
