"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { GoogleSignInButton } from "@/components/ui/google-signin-button";
import { useEffect, useState } from "react";

export default function TestAuth() {
  const { data: session, status } = useSession();
  const [origin, setOrigin] = useState<string>("");
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    setOrigin(window.location.origin);
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Test Page</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-xl mb-2">Session Status: {status}</h2>
          {session && (
            <pre className="bg-gray-100 p-4 rounded">
              {JSON.stringify(session, null, 2)}
            </pre>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-x-4">
            <GoogleSignInButton redirectUrl="/test-auth" />
            <Button
              variant="destructive"
              onClick={() => {
                console.log("Sign out clicked");
                signOut({ callbackUrl: "/test-auth" });
              }}
            >
              Sign Out (Debug)
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            <p>Debug Info:</p>
            <ul className="list-disc pl-4">
              <li>Status: {status}</li>
              <li>Session: {session ? "Yes" : "No"}</li>
              <li>Email: {session?.user?.email || "Not signed in"}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl mb-2">Environment Check:</h2>
          <ul className="list-disc pl-4">
            <li>NEXTAUTH_URL: {origin || "Loading..."}</li>
            <li>Current URL: {currentUrl || "Loading..."}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
