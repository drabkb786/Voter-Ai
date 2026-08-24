import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';

const COOKIE = 'voterai_admin_session';
const MAX_AGE = 60 * 60 * 8;

function hash(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}

function sign(payload: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured');
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const email = String(req.body?.email || '').trim().toLowerCase();
  const password = String(req.body?.password || '');
  const expectedEmail = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const expectedHash = String(process.env.ADMIN_PASSWORD_SHA256 || '').trim().toLowerCase();

  if (!expectedEmail || !expectedHash || !process.env.ADMIN_SESSION_SECRET) {
    return res.status(503).json({ error: 'Admin authentication is not configured.' });
  }

  const valid = email === expectedEmail && safeEqual(hash(password), expectedHash);
  if (!valid) return res.status(401).json({ error: 'Invalid administrator credentials.' });

  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = `${email}|${expires}`;
  const token = `${Buffer.from(payload).toString('base64url')}.${sign(payload)}`;

  res.setHeader('Set-Cookie', `${COOKIE}=${token}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Strict`);
  return res.status(200).json({ authenticated: true, email });
}
