'use client';

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface GoogleSignInButtonProps {
  className?: string;
  redirectUrl?: string;
}

export function GoogleSignInButton({ className, redirectUrl = '/student-home' }: GoogleSignInButtonProps) {
  const handleClick = async () => {
    console.log('GoogleSignInButton: Click handler started');
    try {
      console.log('GoogleSignInButton: Attempting to sign in with redirectUrl:', redirectUrl);
      await signIn('google', { 
        callbackUrl: redirectUrl,
        redirect: false
      }).then((response) => {
        console.log('GoogleSignInButton: Sign in response:', response);
        if (response?.error) {
          console.error('GoogleSignInButton: Auth error:', response.error);
        } else if (response?.url) {
          window.location.href = response.url;
        }
      });
    } catch (error) {
      console.error('GoogleSignInButton: Failed to sign in:', error);
    }
  };

  return (
    <Button
      variant="outline"
      className={`w-full flex items-center justify-center gap-2 ${className}`}
      onClick={handleClick}
    >
      <Image
        src="/google.svg"
        alt="Google logo"
        width={20}
        height={20}
      />
      Sign in with Google
    </Button>
  );
}
