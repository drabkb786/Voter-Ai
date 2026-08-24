import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';

const COOKIE = 'voterai_admin_session';

function sign(payload: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return '';
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const raw = String(req.headers.cookie || '').split(';').map(v => v.trim()).find(v => v.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  if (!raw) return res.status(200).json({ authenticated: false });

  try {
    const [encoded, signature] = raw.split('.');
    const payload = Buffer.from(encoded, 'base64url').toString('utf8');
    const [email, expiresRaw] = payload.split('|');
    const expires = Number(expiresRaw);
    const expected = sign(payload);
    const validSignature = signature && expected && crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    const valid = Boolean(validSignature && expires > Math.floor(Date.now() / 1000) && email === String(process.env.ADMIN_EMAIL || '').trim().toLowerCase());
    if (!valid) return res.status(200).json({ authenticated: false });
    return res.status(200).json({ authenticated: true, email });
  } catch {
    return res.status(200).json({ authenticated: false });
  }
}
