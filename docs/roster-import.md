# Roster Import — 2K25 LLB

The supplied roster contains 85 student rows and can be imported through the Admin → Students flow.

## Supported source columns

The current CSV uses these fields:

- `name` — student name
- `cnic` — CNIC identifier
- `roll` or `roll_no` — student roll number
- `ok` — source eligibility flag, when present
- `department` / `program` — optional metadata
- `batch_shift` — optional metadata
- `residency` — optional metadata

VoterAI should normalize the file into this internal shape:

```text
name
cnic
roll_number
eligible
voted
```

## Import rules

1. Treat `roll` as the preferred roll-number source; fall back to `roll_no`.
2. Trim whitespace and normalize Roll Number casing before comparison.
3. Store CNIC as a string, never as a numeric database field.
4. Reject duplicate Roll Numbers.
5. Reject duplicate CNICs unless an administrator explicitly resolves the conflict.
6. Flag rows missing Name, CNIC, or Roll Number.
7. Never infer that a mismatched CNIC belongs to another student.
8. The `ok` field may be used as an initial eligibility hint, but the Admin must be able to review eligibility before the election starts.
9. Keep the raw upload in private storage only; do not commit the original CSV to a public GitHub repository.
10. Never store a voter-to-candidate mapping in the public client or export it in admin reports.

## Supplied file

The uploaded roster is a real student-data file. It should remain outside the public repository and be selected from the Admin CSV uploader when configuring the live election.

## Recommended Supabase tables

```sql
students(id, name, cnic_hash, roll_number, eligible, voted_at, created_at)
elections(id, name, starts_at, ends_at, status, results_published_at)
candidates(id, election_id, name, roll_number, group_code, active)
ballots(id, election_id, anonymous_token, created_at)
ballot_choices(id, ballot_id, candidate_id, group_code)
audit_events(id, election_id, actor_id, action, metadata, created_at)
```

Use server-side functions and database constraints for eligibility checks, one-time ballot consumption, and privacy separation.
