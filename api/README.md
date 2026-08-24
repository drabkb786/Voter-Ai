# VoterAI admin authentication

The admin credential must be configured as private deployment environment variables, never in React source code or Git.

Required variables:

- `ADMIN_EMAIL` — administrator email address.
- `ADMIN_PASSWORD_SHA256` — SHA-256 hex digest of the administrator password.
- `ADMIN_SESSION_SECRET` — long random secret used to sign the HttpOnly session cookie.

The API exposes:

- `POST /api/admin-login` — validates credentials and creates an 8-hour HttpOnly, Secure, SameSite=Strict session.
- `GET /api/admin-session` — validates the signed session.
- `POST /api/admin-logout` — clears the session.

For Vercel, add these values under Project Settings → Environment Variables. Do not put the real password or its hash in `.env.example`, source code, or public documentation.
