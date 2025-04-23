import { RateLimiterMemory } from 'rate-limiter-flexible';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logger } from '@/lib/logger';
import { getRequestIp } from '@/lib/utils';

// Separate limiters for different endpoints
const authLimiter = new RateLimiterMemory({
  points: 5, // Number of points
  duration: 60, // Per 60 seconds
});

const apiLimiter = new RateLimiterMemory({
  points: 30, // Number of points
  duration: 60, // Per 60 seconds
});

export async function rateLimitMiddleware(
  request: NextRequest,
  response: NextResponse
) {
  const ip = getRequestIp(request);
  const path = request.nextUrl.pathname;

  try {
    // Choose limiter based on path
    const limiter = path.startsWith('/api/auth') ? authLimiter : apiLimiter;
    const key = `${ip}:${path}`;

    await limiter.consume(key);

    // Add rate limit headers
    const headers = new Headers(response.headers);
    headers.set('X-RateLimit-Limit', limiter.points.toString());
    
    const rateLimitRes = await limiter.get(key);
    if (rateLimitRes) {
      headers.set('X-RateLimit-Remaining', Math.max(0, rateLimitRes.remainingPoints).toString());
      headers.set('X-RateLimit-Reset', new Date(Date.now() + rateLimitRes.msBeforeNext).toUTCString());
    }

    return NextResponse.next({
      request: {
        headers: headers,
      },
    });
  } catch (error) {
    // Log rate limit exceeded
    await logger.warn('security', 'Rate limit exceeded', {
      ip,
      path,
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    // Return 429 Too Many Requests
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests',
        message: 'Please try again later'
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60'
        }
      }
    );
  }
}
