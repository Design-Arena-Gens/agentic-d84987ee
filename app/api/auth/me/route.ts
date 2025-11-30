import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/jwt';

export async function GET() {
  const token = cookies().get('auth_token')?.value;
  if (!token) return NextResponse.json({ user: null });
  const payload = verifyJwt(token);
  if (!payload) return NextResponse.json({ user: null });
  return NextResponse.json({ user: payload });
}
