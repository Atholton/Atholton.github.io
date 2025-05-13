import NextAuth from "next-auth";
import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Test user roles mapping
const TEST_USER_ROLES: { [email: string]: 'teacher' | 'student' } = {
  'hanaohrhee@gmail.com': 'teacher', 
  'tmccormick1104@gmail.com': 'student',
  'joelihm1@gmail.com': 'student',
  'tristan.carter66@gmail.com': 'student',
  'cobi.hayden.17@gmail.com': 'student',
  'radhik.ampani@gmail.com': 'student',
  'ecasto6465@gmail.com': 'student',
  'nathanli484@gmail.com': 'student',
};

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    userRole?: 'teacher' | 'student';
    user: {
      email?: string | null;
      name?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
    userRole?: 'teacher' | 'student';
    email?: string;
    name?: string;
  }
}

console.log('NextAuth: Loading configuration');
console.log('NextAuth: Client ID:', process.env.GOOGLE_CLIENT_ID);
console.log('NextAuth: Client Secret length:', process.env.GOOGLE_CLIENT_SECRET?.length);

console.log('NextAuth: Starting configuration');
if (!process.env.GOOGLE_CLIENT_ID) console.error('NextAuth: Missing GOOGLE_CLIENT_ID');
if (!process.env.GOOGLE_CLIENT_SECRET) console.error('NextAuth: Missing GOOGLE_CLIENT_SECRET');
if (!process.env.NEXTAUTH_URL) console.error('NextAuth: Missing NEXTAUTH_URL');
if (!process.env.NEXTAUTH_SECRET) console.error('NextAuth: Missing NEXTAUTH_SECRET');

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile"
        },
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account }: { user: User, account: Account | null }) {
      try {
        if (!user?.email) {
          console.error('No email provided');
          return '/auth/error?error=NoEmail';
        }

        // DEVELOPMENT MODE: Allow any Google account
        console.log('Attempting sign in for:', user.email);

        // TODO: Re-enable domain verification before production
        // if (!user.email.endsWith('@inst.hcpss.org') && !user.email.endsWith('@hcpss.org')) {
        //   console.warn('Invalid email domain:', user.email);
        //   return '/auth/error?error=InvalidDomain';
        // }

        if (!account) {
          console.error('No account data provided');
          return '/auth/error?error=NoAccount';
        }

        return true;
      } catch (error) {
        console.error('Sign in error:', error);
        return '/auth/error?error=SignInFailed';
      }
    },
    async redirect({ url, baseUrl }) {
      // Always allow error pages to redirect
      if (url.includes('/auth/error')) {
        return url;
      }

      // Allow relative URLs
      if (url.startsWith('/')) {
        const fullUrl = `${baseUrl}${url}`;
        return fullUrl;
      }

      // Allow URLs on the same origin
      if (url.startsWith(baseUrl)) {
        return url;
      }

      // After successful sign in, let the client handle redirection
      // based on the session role

      // Default fallback
      return baseUrl;
    },
    async jwt({ token, account, user }: { token: JWT, account: Account | null, user: User }) {
      try {
        // Keep existing token data if no new sign in
        if (!account || !user) {
          return token;
        }

        // Update token with new sign in data
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.email = user.email || undefined;
        token.name = user.name || undefined;
        
        // Verify token with backend
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accounts/verify-token/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: account.id_token }),
          });

          if (!response.ok) {
            throw new Error('Failed to verify token with backend');
          }

          const data = await response.json();
          token.userRole = data.role;
          token.name = data.name;
          
          // Fallback to test users if backend verification fails
          if (!token.userRole && user.email && user.email in TEST_USER_ROLES) {
            console.warn('Using test user role fallback for:', user.email);
            token.userRole = TEST_USER_ROLES[user.email];
          }
        } catch (error) {
          console.error('Backend verification failed:', error);
          // Fallback to test users
          if (user.email && user.email in TEST_USER_ROLES) {
            console.warn('Using test user role fallback for:', user.email);
            token.userRole = TEST_USER_ROLES[user.email];
          } else {
            token.userRole = 'student'; // Default role
          }
        }

        return token;
      } catch (error) {
        console.error('JWT callback error:', error);
        return token;
      }
    },
    async session({ session, token }: { session: Session, token: JWT }): Promise<Session> {
      // Add token data to session
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.userRole = token.userRole;

      // Ensure user object exists
      if (!session.user) {
        session.user = {};
      }

      // Add role and email to user object
      if (session.user) {
        (session.user as any).userRole = token.userRole;
        session.user.email = token.email;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
