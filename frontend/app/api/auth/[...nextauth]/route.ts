import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { OAuth2Client } from 'google-auth-library';
import { logger } from '@/lib/logger';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface BackendResponse {
  status: string;
  role: string;
  name?: string;
}

// Debug function to log auth events
const logAuthEvent = async (event: string, data: any) => {
  console.log(`NextAuth Event [${event}]:`, data);
  await logger.info('auth', event, data);
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      await logAuthEvent('signIn started', { email: profile?.email });
      if (account?.provider === "google") {
        try {
          // 1. Verify Google ID token
          if (!account.id_token) {
            await logger.error('auth', 'Missing ID token', new Error('No ID token provided'));
            return false;
          }

          try {
            const ticket = await googleClient.verifyIdToken({
              idToken: account.id_token,
              audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            
            if (!payload) {
              await logger.error('auth', 'Invalid ID token', new Error('No payload'));
              return false;
            }
          } catch (error) {
            await logger.error('auth', 'ID token verification failed', error as Error);
            return false;
          }

          // 2. Verify HCPSS domain
          if (!profile?.email?.endsWith("@inst.hcpss.org")) {
            await logger.warn('auth', 'Invalid email domain', { email: profile?.email });
            return false;
          }

          // 3. Verify user in backend
          try {
            const response = await fetch(`${BACKEND_URL}/api/accounts/verify/`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: profile.email }),
            });

            if (!response.ok) {
              await logger.warn('auth', 'Backend verification failed', { 
                email: profile.email,
                status: response.status 
              });
              return false;
            }

            const backendData = await response.json() as BackendResponse;
            if (backendData.status === 'success') {
              
              if (backendData.role !== 'teacher' && backendData.role !== 'student') {
                await logger.warn('auth', 'Invalid role from backend', { 
                  email: profile.email,
                  role: backendData.role
                });
                return '/unauthorized';
              }

              await logAuthEvent('Authentication successful', { 
                email: profile.email,
                role: backendData.role 
              });
              return true;
            }
            
            await logger.warn('auth', 'Backend verification denied', { 
              email: profile.email 
            });
            return false;
          } catch (error) {
            await logger.error('auth', 'Backend verification error', error as Error, { 
              email: profile.email 
            });
            return false;
          }
        } catch (error) {
          await logger.error('auth', 'Sign-in process error', error as Error);
          return false;
        }
      }
      
      await logger.warn('auth', 'Invalid provider', { provider: account?.provider });
      return false;
    },
    async jwt({ token, account, profile }) {
      // Verify user role on first sign in
      if (account && profile?.email) {
        try {
          const response = await fetch(`${BACKEND_URL}/api/accounts/verify/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: profile.email }),
          });

          if (response.ok) {
            const data = await response.json() as BackendResponse;
            if (data.status === 'success' && (data.role === 'teacher' || data.role === 'student')) {
              token.userRole = data.role;
              if (data.name) token.name = data.name;
              
              await logger.info('auth', 'JWT updated with role', {
                email: profile.email,
                role: data.role
              });
            } else {
              await logger.warn('auth', 'Invalid role in JWT callback', {
                email: profile.email,
                role: data.role
              });
              token.userRole = 'unauthorized';
            }
          }
        } catch (error) {
          await logger.error('auth', 'Failed to fetch user role', error as Error);
          token.userRole = 'error';
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom session data
      if (session.user) {
        session.user.role = token.userRole;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login/teacher", // Default to teacher login
    error: "/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
