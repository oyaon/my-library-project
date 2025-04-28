import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define routes that require authentication
  const protectedRoutes = ['/loans', '/books', '/events'];

  const isLoggedIn = req.cookies.get('loggedIn')?.value === 'true';

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isLoggedIn) {
      const url = new URL(`/login`, req.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/loans', '/books', '/events'],
};
