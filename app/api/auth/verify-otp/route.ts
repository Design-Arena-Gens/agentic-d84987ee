import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyOtp } from '@/lib/otp';
import { signJwt } from '@/lib/jwt';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

const schema = z.object({ email: z.string().email(), code: z.string().length(6) });

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parse = schema.safeParse(json);
  if (!parse.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

  await connectToDatabase();
  const email = parse.data.email.toLowerCase();
  const user = await User.findOne({ email });
  if (!user || !user.otpHash || !user.otpExpiresAt) {
    return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
  }
  if (user.otpExpiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: 'Code expired' }, { status: 400 });
  }
  const isValid = verifyOtp(parse.data.code, user.otpHash);
  if (!isValid) return NextResponse.json({ error: 'Invalid code' }, { status: 400 });

  user.otpHash = undefined as any;
  user.otpExpiresAt = undefined as any;
  await user.save();

  const token = signJwt({ sub: String(user._id), email: user.email, role: user.role });
  const res = NextResponse.json({ ok: true });
  res.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
