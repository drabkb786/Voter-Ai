# Lovable build prompt — VoterAI

Build this repository into a production-quality student election platform called **VoterAI**. The repository now contains a redesigned React/Vite prototype in `src/App.tsx`, reusable UI in `src/components.tsx`, structured mock data in `src/data.ts`, and responsive styling in `src/styles.css`. Use these screens as the visual reference, then replace mock state with a real Supabase backend.

## Product behavior

An administrator imports a CSV roster containing `name`, `cnic`, and `roll_number`. A voter may enter Roll Number + CNIC only when both values match the exact same registered student and that student is marked eligible.

Each eligible voter gets one ballot containing two independent choices:

- **CR — Class Representative:** exactly one candidate.
- **GR — General Representative:** exactly one candidate.

After final submission the voter cannot edit or resubmit the ballot. Voter eligibility must be tracked separately from candidate choices so administrators cannot inspect a direct voter-to-candidate mapping.

## Visual system

Preserve the new prototype's visual language rather than reverting to a generic dashboard template:

- Premium light UI with warm-white/very-light-gray page surfaces.
- Deep navy for primary actions and admin navigation.
- Teal/green for live, success and security states.
- Soft blue for informational states and CR accents.
- Soft violet for GR accents.
- Manrope for large headings; DM Sans for supporting UI.
- Thin cool-gray borders, subtle shadows, restrained rounded corners.
- No noisy gradients, stock imagery, oversized illustrations or excessive glassmorphism.
- Use Lucide icons consistently.
- Mobile-first responsive behavior.
- Visible keyboard focus states and accessible labels.

## Public voter experience

### Landing page

Recreate the prototype's structure:

- VoterAI wordmark.
- Live election status.
- Hero: **“Your voice. Your choice.”**
- Primary CTA: **Enter ballot**.
- Secondary CTA: **How voting works**.
- Trust indicators for verified voters, private ballot and one-time voting.
- A compact visual preview of a ballot.
- Election metrics.
- Three-step explanation: Verify → Choose → Submit.
- Privacy-first section.

Do not reveal the student roster, voter identities, or candidate vote totals on the public landing page.

### Voter verification

Use a secure server-side operation. Never download the complete student roster into the browser.

Require:

`students.roll_number == entered_roll_number AND students.cnic_hash == hash(entered_cnic)`

Also require:

- student exists;
- student is eligible;
- election is LIVE;
- voting authorization is unused.

Use one generic error message for failed verification. Do not tell the voter which field was wrong.

### Ballot

The prototype's ballot page should become the production `/vote` route:

- election title and live/closing state;
- CR candidate cards;
- GR candidate cards;
- one selection per group;
- `0 / 2`, `1 / 2`, `2 / 2` progress;
- Review & Submit disabled until both categories are selected;
- optional candidate photo and manifesto;
- no voter CNIC or other sensitive identity data on the ballot.

### Confirmation

Before writing the ballot, show both selected candidates in a modal and clearly state that the submission is final. Require an explicit **Confirm & submit** action.

### Success

Show a clean completion state:

- “Thank you for voting.”
- CR selection recorded.
- GR selection recorded.
- privacy/security indicator.
- no candidate vote totals.
- no receipt that proves a specific voter chose a specific candidate.

## Admin authentication

Create a protected `/admin` area using Supabase Auth. Never hard-code an admin password in frontend code.

Navigation:

1. Overview
2. Students
3. Create Room
4. Candidates
5. Results
6. Audit Log

The admin interface should retain the prototype's navy sidebar + light content layout and work well on mobile with a slide-out navigation.

## Overview

Show:

- Registered students
- Eligible voters
- Votes cast
- Participation percentage
- Election status
- Countdown
- Participation chart
- Turnout ring
- Recent roster preview
- CSV import card
- Election setup summary

Never expose voter-to-candidate mappings.

## Students / CSV roster

Required columns:

`name, cnic, roll_number`

CSV workflow:

1. Upload file.
2. Parse and validate.
3. Show preview.
4. Detect duplicate CNICs.
5. Detect duplicate roll numbers.
6. Detect missing values.
7. Show row numbers and validation errors.
8. Require confirmation before import/replacement.
9. Persist only after server-side validation.

Student table features:

- search by name/roll;
- filter Eligible / Not Eligible / Voted / Not Voted;
- eligibility toggle;
- masked CNIC;
- safe CSV export.

Do not export ballot choices alongside voter identity.

## Create Room

Use the prototype's election setup page as a wizard/editor.

Fields:

- election name;
- academic year/section;
- start date/time;
- end date/time;
- CR enabled;
- GR enabled;
- result publication policy;
- tie policy.

Lifecycle:

`DRAFT → SCHEDULED → LIVE → ENDED → RESULTS_PUBLISHED`

When LIVE, lock candidate membership and voting rules. Ending early must require explicit confirmation and be audited.

## Candidates

Maintain two separate candidate pools:

### CR
- name
- roll number
- optional photo
- optional short manifesto
- active/inactive

### GR
Same fields.

Where possible, candidates must reference registered students from the roster.

## Results

Admin results should include:

- CR ranking;
- GR ranking;
- vote counts;
- percentages;
- total ballots cast;
- turnout;
- tie state where applicable.

Keep results private until the administrator explicitly publishes them. The public results page should show polished CR and GR winner cards after publication.

## Privacy-preserving ballot architecture

Do **not** implement a direct table such as:

`votes(voter_student_id, cr_candidate_id, gr_candidate_id)`

Use separate concepts:

- `students` — identity and eligibility data.
- `voting_authorizations` — one record per student/election, tracks whether voting rights were consumed, but stores no candidate selections.
- `ballots` — anonymous ballot containing CR/GR selections, with no student ID, CNIC or roll number.

A server-side transaction/RPC must atomically:

1. authenticate the voter;
2. verify the exact roster match;
3. verify eligibility and election state;
4. verify the authorization is unused;
5. create the anonymous ballot;
6. mark the authorization consumed;
7. reject duplicate submissions.

Use database constraints/RLS and server-side authorization. Client-side checks are only UX helpers, never security controls.

## Security

- HTTPS/TLS in production.
- Supabase RLS for every sensitive table.
- Least-privilege admin roles.
- No CNIC or secret credentials in browser logs.
- Mask CNIC in UI.
- Generic authentication/verification failures.
- Rate-limit voter verification attempts.
- Session expiry and secure logout.
- Immutable audit events for sensitive admin actions.
- Never log candidate selections together with voter identity.

## Deployment

The frontend should remain Vercel-compatible. Supabase should hold production data and server-side operations. Store all credentials in environment variables. Provide a clear README for local setup, Supabase configuration, migrations, RLS policies, and deployment.
