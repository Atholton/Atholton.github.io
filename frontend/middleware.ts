import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Define protected paths and their required roles
const PROTECTED_PATHS = {
  '/teacher': ['teacher', 'admin'],
  '/student': ['student', 'admin'],
  '/admin': ['admin'],
}

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request })
  const path = request.nextUrl.pathname

  // Allow public paths
  if (path === '/' || 
      path.startsWith('/login') || 
      path.startsWith('/auth') ||
      path.startsWith('/guest') ||
      path.startsWith('/_next') ||
      path.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Check role-based access
  const userRole = session.role as string
  for (const [protectedPath, allowedRoles] of Object.entries(PROTECTED_PATHS)) {
    if (path.startsWith(protectedPath) && !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
