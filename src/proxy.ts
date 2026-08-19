import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE, verifyToken } from '@/lib/auth';

// API routes the public site is allowed to POST to without a session
const PUBLIC_API_PATHS = ['/api/simbark', '/api/auth/login', '/api/auth/logout'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApi = pathname.startsWith('/api');

  // Only writes are gated on the API; reading published content stays public
  if (isApi && (request.method === 'GET' || PUBLIC_API_PATHS.includes(pathname))) {
    return NextResponse.next();
  }

  if (await verifyToken(request.cookies.get(AUTH_COOKIE)?.value)) {
    return NextResponse.next();
  }

  if (isApi) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
