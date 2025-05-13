import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Define protected paths and their required roles
const PROTECTED_PATHS = {
  '/teacher': ['teacher'],
  '/student': ['student'],
  '/admin': ['admin'],
}

export async function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static/') ||
    pathname.startsWith('/api/auth/') ||
    pathname.includes('favicon.ico')
  ) {
    return NextResponse.next()
  }

  try {
    // Get the token and verify authentication
    const token = await getToken({ req: request })

    // Check if the path requires authentication
    const requiredRoles = Object.entries(PROTECTED_PATHS).find(([path]) =>
      pathname.startsWith(path)
    )?.[1]

    if (requiredRoles) {
      // No token, redirect to login
      if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // Check if user has required role
      if (!token.userRole || !requiredRoles.includes(token.userRole)) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return NextResponse.redirect(new URL('/error', request.url))
  }
}
