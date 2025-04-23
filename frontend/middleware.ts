import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { rateLimitMiddleware } from './middleware/rate-limit'
import { logger } from '@/lib/logger'
import { getRequestIp } from '@/lib/utils'

// Define protected paths and their required roles
const PROTECTED_PATHS = {
  '/teacher': ['teacher', 'admin'],
  '/student': ['student', 'admin'],
  '/admin': ['admin'],
}

// Security headers configuration
const securityHeaders = {
  'Content-Security-Policy':
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "frame-src 'self' https://accounts.google.com; " +
    "connect-src 'self' https://accounts.google.com https://www.googleapis.com;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Create base response
  const response = NextResponse.next()
  
  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Apply rate limiting first
  if (pathname.startsWith('/api/')) {
    const rateResponse = await rateLimitMiddleware(request, response)
    if (rateResponse.status === 429) {
      return rateResponse
    }
  }

  // Skip middleware for static files
  if (
    pathname.startsWith('/_next') || // Skip Next.js internals
    pathname.startsWith('/static/') || // Skip static files
    pathname.includes('.') // Skip files with extensions
  ) {
    return response
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
        await logger.info('auth', 'Unauthorized access attempt', {
          path: pathname,
          ip: getRequestIp(request),
        })
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // Check if user has required role
      if (!token.userRole || !requiredRoles.includes(token.userRole)) {
        await logger.warn('security', 'Invalid role access attempt', {
          path: pathname,
          userRole: token.userRole,
          requiredRoles,
          ip: getRequestIp(request),
        })
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }

      // Log successful access
      await logger.info('auth', 'Authorized access', {
        path: pathname,
        userRole: token.userRole,
        ip: getRequestIp(request),
      })
    }

    return response
  } catch (error) {
    await logger.error('system', 'Middleware error', error as Error)
    return NextResponse.redirect(new URL('/error', request.url))
  }
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
