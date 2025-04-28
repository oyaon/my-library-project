import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes and their required roles
const protectedRoutes = [
  {
    route: '/books',
    allowedRoles: ['admin', 'librarian'],
  },
  {
    route: '/events',
    allowedRoles: ['admin', 'librarian'],
  },
  // Add more protected routes as needed
];

// Function to check if a route is protected
const isProtectedRoute = (route: string) => {
  return protectedRoutes.some((protectedRoute) => route.startsWith(protectedRoute.route));
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the route is protected
  if (isProtectedRoute(pathname)) {
    // Get the user's role from a cookie or authentication context (replace with your actual logic)
    const userRole = req.cookies.get('userRole')?.value || 'guest'; // Default to 'guest' if no role is found

    // Find the allowed roles for the route
    const allowedRoles = protectedRoutes.find((protectedRoute) =>
      pathname.startsWith(protectedRoute.route)
    )?.allowedRoles;

    // Check if the user has the required role
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      // Redirect to a login or unauthorized page
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

// Define the matcher for the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon\\.ico).*)',
  ],
};

