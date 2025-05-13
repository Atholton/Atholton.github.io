import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { authMiddleware } from './middleware/auth'
import { rateLimitMiddleware } from './middleware/rate-limit'

// Security headers configuration
const securityHeaders = {
  'Content-Security-Policy':
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "frame-src 'self' https://accounts.google.com; " +
    "connect-src 'self' http://localhost:8000 https://accounts.google.com https://www.googleapis.com;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

export async function middleware(request: NextRequest) {
  // Create base response
  const response = NextResponse.next()
  
  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Apply rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const rateResponse = await rateLimitMiddleware(request, response)
    if (rateResponse.status === 429) {
      return rateResponse
    }
  }

  // Apply auth middleware
  return authMiddleware(request)
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
