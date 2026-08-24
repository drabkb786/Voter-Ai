import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Set-Cookie', 'voterai_admin_session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict');
  return res.status(200).json({ authenticated: false });
}
