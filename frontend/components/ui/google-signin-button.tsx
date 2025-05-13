'use client';

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface GoogleSignInButtonProps {
  className?: string;
  redirectUrl?: string;
}

export function GoogleSignInButton({ className, redirectUrl }: GoogleSignInButtonProps) {
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('GoogleSignInButton: Click handler started');
    try {
      console.log('GoogleSignInButton: Attempting to sign in with Google');
      const result = await signIn('google', { 
        redirect: false,
        callbackUrl: '/student'
      });
      console.log('GoogleSignInButton: Sign in result:', JSON.stringify(result, null, 2));
    } catch (error: any) {
      console.error('GoogleSignInButton: Error details:', {
        name: error?.name,
        message: error?.message,
        stack: error?.stack,
        cause: error?.cause
      });
    }
    return false;
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
