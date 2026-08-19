import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_COOKIE, cookieOptions, createToken } from '@/lib/auth';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: 'Admin credentials are not configured' },
      { status: 500 }
    );
  }

  const emailMatches =
    typeof email === 'string' &&
    email.trim().toLowerCase() === process.env.ADMIN_EMAIL.trim().toLowerCase();

  if (!emailMatches || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Incorrect email or password' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, await createToken(), cookieOptions);

  return NextResponse.json({ ok: true });
}
