import NextAuth from "next-auth";
import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Test user roles mapping
const TEST_USER_ROLES: { [email: string]: 'teacher' | 'student' } = {
  'Hana_Rhee@hcpss.org': 'teacher', 
  'tmccormick1104@mgail.com': 'student',
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
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "online", // Changed to online since we don't need refresh tokens
          response_type: "code",
          scope: "openid email profile",
          // Remove any hosted domain restrictions
        },
      },
    }),
  ],
  pages: {
    signIn: "/login/student",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account }: { user: User, account: Account | null }) {
      // DEVELOPMENT MODE: Allow any Google account
      console.warn('DEVELOPMENT MODE: Email domain verification is temporarily disabled');
      console.log('Signed in user:', user.email);

      // TODO: Re-enable domain verification before production
      // if (!user.email || (!user.email.endsWith('@inst.hcpss.org') && !user.email.endsWith('@hcpss.org'))) {
      //   console.warn('Invalid email domain:', user.email);
      //   return '/auth/error?error=InvalidDomain';
      // }

      return true;
    },
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
    async jwt({ token, account, user }: { token: JWT, account: Account | null, user: User }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        
        // Assign role based on email for test users
        if (user.email && user.email in TEST_USER_ROLES) {
          token.userRole = TEST_USER_ROLES[user.email];
          console.log(`Assigned role ${token.userRole} to ${user.email}`);
        } else {
          console.log(`No role assigned for ${user.email}`);
          token.userRole = 'student'; // Default role
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }): Promise<Session> {
      if (session.user) {
        session.accessToken = token.accessToken;
        session.idToken = token.idToken;
        session.userRole = token.userRole;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
