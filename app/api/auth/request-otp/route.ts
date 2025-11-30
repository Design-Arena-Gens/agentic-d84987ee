import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateOtp } from '@/lib/otp';
import { sendOtpEmail } from '@/lib/email';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parse = schema.safeParse(json);
  if (!parse.success) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });

  await connectToDatabase();

  const { code, hash, expiresAt } = generateOtp();
  const email = parse.data.email.toLowerCase();

  const user = await User.findOneAndUpdate(
    { email },
    { $set: { email, otpHash: hash, otpExpiresAt: expiresAt } },
    { new: true, upsert: true }
  );

  await sendOtpEmail(email, code);

  return NextResponse.json({ ok: true, message: 'OTP sent' });
}
