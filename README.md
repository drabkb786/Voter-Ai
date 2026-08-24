# Voter-Ai

VoterAI is a modern student-election platform prototype for verified access, configurable CR/GR candidate rooms, one-time voting, privacy-aware ballot architecture, CSV roster management, and controlled result publishing.

## Redesigned experience

The current UI has been rebuilt around a calmer, premium light interface:

- Public voter landing page with a clear election CTA and trust signals
- Roll Number + CNIC verification modal with exact-record matching in the prototype
- Dedicated two-column CR/GR ballot with candidate cards and review-before-submit
- Confirmation modal and completed-ballot receipt state
- Responsive mobile ballot experience
- Full administrator control center with navigation for Overview, Students, Create Room, Candidates, Results and Audit Log
- CSV roster upload surface
- Student eligibility toggles and search
- Election configuration form with timing and voting rules
- Participation/turnout dashboard and result publishing surface
- Accessible labels, semantic sections, keyboard-friendly buttons and responsive breakpoints

## Lovable handoff

See `docs/lovable-prompt.md` for the production implementation brief. It describes the Supabase data model, server-side authorization, CSV validation, election lifecycle, candidate management, privacy boundary, audit logging, and deployment requirements.

## Important production boundary

The current repository is a UI/interaction prototype. A real election must not rely on client-side state for security. Production deployment should enforce voter eligibility, one-time voting, election timing, role permissions, and ballot privacy on the server/database using authenticated APIs, database constraints/RLS, TLS, secure secrets, and audited administrative actions.

## Suggested stack

- React + TypeScript + Vite (current prototype)
- Tailwind CSS + shadcn/ui for a Lovable production conversion
- Supabase Auth + Postgres + Storage
- Papa Parse or equivalent for CSV parsing
- Recharts or an equivalent accessible chart library
- Vercel for the web application
