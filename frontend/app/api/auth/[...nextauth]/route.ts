import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        // First verify hcpss.org domain
        if (!profile?.email?.endsWith("@inst.hcpss.org")) {
          return false;
        }

        try {
          // Verify user exists in our backend
          const response = await fetch(`${BACKEND_URL}/api/accounts/verify/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: profile.email }),
          });

          if (!response.ok) {
            return false;
          }

          const data = await response.json();
          return data.status === 'success';
        } catch (error) {
          console.error('Backend verification failed:', error);
          return false;
        }
      }
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
            const data = await response.json();
            token.userRole = data.role;
            token.name = data.name;
          }
        } catch (error) {
          console.error('Failed to fetch user role:', error);
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
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
