"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export default function TestAuth() {
  const { data: session, status } = useSession();

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

        <div className="space-x-4">
          <Button
            onClick={() => {
              console.log("Sign in clicked");
              signIn("google", {
                callbackUrl: "/test-auth",
                redirect: true,
              });
            }}
          >
            Sign In (Debug)
          </Button>

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

        <div className="mt-8">
          <h2 className="text-xl mb-2">Environment Check:</h2>
          <ul className="list-disc pl-4">
            <li>
              NEXTAUTH_URL:{" "}
              {typeof window !== "undefined"
                ? window.location.origin
                : "Not available"}
            </li>
            <li>
              Current URL:{" "}
              {typeof window !== "undefined" ? window.location.href : "Not available"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
