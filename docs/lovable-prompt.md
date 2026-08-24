# Lovable build prompt — VoterAI

Build this repository into a production-quality student election platform called **VoterAI**. The existing `src/App.tsx` and `src/styles.css` provide the visual direction and interaction prototype; preserve the visual language while replacing mock state with a real Supabase backend.

## Product

VoterAI is a controlled student election system. An administrator imports a CSV roster containing `name`, `cnic`, and `roll_number`. A voter may enter Roll Number + CNIC only if those two values match the exact same student record and the student is marked eligible. After verification, the voter receives a ballot with two independent categories:

- CR (Class Representative): exactly one choice.
- GR (General Representative): exactly one choice.

One eligible voter can cast one CR and one GR selection. After submission, the ballot cannot be edited or resubmitted. Voter identity must be separated from ballot choices so an admin cannot inspect a direct voter-to-candidate mapping.

## Visual direction

Create a premium, restrained, modern election interface:

- Dark navy/ink background with subtle blue and teal ambient gradients.
- Typography similar to Space Grotesk for headings and DM Sans for UI.
- Rounded cards, thin borders, soft shadows, restrained glass effects.
- Teal for successful/security states, blue for informational elements, red only for destructive/error states.
- No excessive gradients, no generic template look, no huge marketing illustrations.
- Responsive on desktop, tablet and mobile.
- Strong keyboard focus states and accessible labels.
- Use Lucide icons consistently.

## Public voter flow

### `/`

Show a clean election landing/login screen:

- VoterAI logo/wordmark.
- “Student Election 2026” live status.
- Headline: “Make your voice count.”
- Roll Number input.
- CNIC input.
- Continue button.
- Security note explaining that identity is verified for eligibility while ballot choices are kept separate.

Do not expose a list of students, candidates, vote totals, or sensitive data before authentication.

### Verification

On Continue, call a secure server-side operation. Never fetch the entire student roster into the browser. Normalize only safe input formatting; do not silently transform one student's data into another student's identity.

Require an exact pair match:

`students.roll_number == entered_roll_number AND students.cnic_hash == hash(entered_cnic)`

Also require:

- student exists;
- student is eligible;
- current election is LIVE;
- student has not already received/consumed a voting authorization for this election.

Show one generic failure message such as “The provided details could not be verified for this election.” Do not reveal whether Roll Number or CNIC was the mismatched field.

### `/vote`

Show:

- election title and closing countdown;
- CR candidates as selectable cards;
- GR candidates as selectable cards;
- exactly one selection allowed in each group;
- progress indicator `0/2`, `1/2`, `2/2`;
- Review & Submit button disabled until both are selected.

Candidate cards may include name, roll number, and optional admin-uploaded photo. Never show sensitive voter data.

### Confirmation

Before final submission, open a confirmation modal:

“Your selections are final. After submission you cannot change your vote.”

Show selected CR and GR names. Require an explicit Confirm & Submit action.

### Success

Show a calm confirmation screen:

- “Thank you for voting.”
- “Your ballot has been securely submitted.”
- CR selection recorded.
- GR selection recorded.
- privacy/security indicator.
- no candidate vote totals.
- no voter identity receipt that could be used to prove a vote choice.

## Admin authentication

Create a separate admin login and protected `/admin` route. Use Supabase Auth. Never implement an admin password in frontend source code.

Admin navigation:

1. Overview
2. Students
3. Create Room
4. Candidates
5. Results
6. Audit Log

## Admin Overview

Dashboard cards:

- Registered students
- Eligible voters
- Votes cast
- Participation percentage
- Current election status
- Time remaining

Include a clean participation chart. Do not expose voter-to-candidate mappings.

## Students

Build a professional roster manager:

- Drag/drop CSV upload.
- CSV validation preview before import.
- Required columns: `name`, `cnic`, `roll_number`.
- Detect duplicate CNICs.
- Detect duplicate roll numbers.
- Detect missing values.
- Show invalid rows with row numbers and reasons.
- Require admin confirmation before replacing/importing roster.
- Search by name or roll number.
- Filter Eligible / Not Eligible / Voted / Not Voted.
- Toggle eligibility.
- Never display full CNIC in the general table; mask it.
- Allow safe export of roster metadata, but do not export ballot choices with voter identities.

## Create Room / Election setup

The “Create Room” concept from the original design should become a polished election setup wizard.

Fields:

- Election name
- Academic year / section
- Start date/time
- End date/time
- CR enabled
- GR enabled
- Result publication policy
- Tie policy

Lifecycle:

`DRAFT -> SCHEDULED -> LIVE -> ENDED -> RESULTS_PUBLISHED`

Once an election is LIVE, lock sensitive configuration such as candidate membership and voting rules. Require an explicit confirmation for ending an election early.

## Candidates

Create two clearly separated candidate pools:

### CR

Candidate fields:
- name
- roll number
- optional photo
- optional short manifesto
- active/inactive

### GR

Same fields.

Candidate selection should be done from the imported roster where possible so a candidate must correspond to a registered student.

Do not allow a candidate to vote for themselves to be treated specially; it is still a normal vote unless the election rules explicitly say otherwise.

## Results

Admin results page should show:

- CR ranking by votes
- GR ranking by votes
- vote count
- percentage
- total ballots cast
- turnout
- invalid/rejected ballot count if the implementation supports it

Do not show results to voters until an admin publishes them.

When published, show a polished winner screen for CR and GR. Handle ties using the election's configured tie policy.

## Privacy-preserving ballot model

This is a critical requirement.

Do NOT create a simple table like:

`votes(voter_student_id, cr_candidate_id, gr_candidate_id)`

because it creates a direct voter-to-choice mapping.

Instead use an eligibility/authorization record separate from the anonymous ballot record.

Conceptual model:

`students` -> verifies identity and eligibility

`voting_authorizations` -> one per student/election, tracks whether the voter has consumed their voting right, but contains no candidate selections

`ballots` -> anonymous election ballot with CR/GR candidate references, contains no student ID/CNIC/roll number

A secure server-side transaction/function must atomically:

1. verify the student/election eligibility;
2. verify authorization is unused;
3. create an anonymous ballot;
4. mark the authorization consumed;
5. return success.

The client must never be trusted to enforce one-vote rules.

Important: choose a database design that prevents the application from retaining a reversible voter-to-ballot correlation. Do not put voter IDs into ballot metadata, analytics events, URLs, client storage, or logs.

## Database tables

Create suitable Supabase/Postgres tables such as:

- `elections`
- `students`
- `election_eligibility`
- `candidates`
- `voting_authorizations`
- `ballots`
- `audit_logs`

Use UUID primary keys. Store CNIC as a cryptographic hash for matching rather than plaintext where practical. Keep access to the original CSV restricted and short-lived; never commit CSV data into Git.

Suggested relationships:

- election has many eligibility records
- election has many candidates
- election has many voting authorizations
- election has many anonymous ballots
- candidate belongs to an election and a group (`CR` or `GR`)

## Security

Implement:

- Supabase Row Level Security.
- Admin-only policies for roster, candidates, election settings and results administration.
- Voter-side server functions for identity verification and ballot submission.
- Rate limiting / abuse protection around verification.
- Session timeout where appropriate.
- CSRF-safe architecture according to Supabase's recommended patterns.
- No secrets in frontend source.
- No sensitive data in console logs.
- Generic authentication failure messages.
- Audit logs for admin configuration actions, never ballot choices tied to students.

## CSV behavior

Accept UTF-8 CSV. Normalize header names safely, but require the semantic fields. Preview parsed rows before import. A failed import must not partially replace the active roster.

## UX details

Add:

- skeleton loaders;
- empty states;
- inline validation;
- success/error toasts;
- confirmation modals for destructive actions;
- disabled states during network requests;
- mobile-friendly tables that become cards;
- accessible keyboard navigation;
- clear focus rings;
- reduced-motion friendly transitions.

Use optimistic UI only for harmless UI state, not for election-critical operations.

## Demo mode

Keep a clearly labeled local demo mode for UI preview only. Never present demo data as real election data. Production mode must require Supabase configuration.

## README

Update README with:

- setup instructions;
- environment variables;
- Supabase setup;
- database migration instructions;
- RLS policy overview;
- how to import a roster;
- how to create an election;
- how the privacy boundary works;
- deployment instructions for Lovable/Vercel.

## Quality bar

The finished app should feel like a serious university election product, not a generic CRUD dashboard. Keep the interface visually consistent with the existing prototype in this repository, but make every critical action production-safe and server-authoritative.
