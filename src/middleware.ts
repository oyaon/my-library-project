import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the roles that can access certain paths
const authorizedPaths = {
  '/books': ['admin', 'librarian', 'member'],
  '/events': ['admin', 'librarian', 'member'],
};

export function middleware(request: NextRequest) {
  const userRole = request.cookies.get('userRole')?.value;
  const path = request.nextUrl.pathname;

  if (authorizedPaths[path as keyof typeof authorizedPaths]) {
    const allowedRoles = authorizedPaths[path as keyof typeof authorizedPaths];
    if (!userRole || !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Define the paths that the middleware should run for
export const config = {
  matcher: ['/books', '/events'],
};
