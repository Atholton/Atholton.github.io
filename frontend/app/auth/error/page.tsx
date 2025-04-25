'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
function ErrorPageContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'AccessDenied':
        return {
          title: 'HCPSS Account Required',
          message: 'Please sign in with your HCPSS account (@inst.hcpss.org)'
        };
      case 'AccountNotFound':
        return {
          title: 'Account Not Found',
          message: 'Your account was not found in our system. Please check your email or contact the administrator.'
        };
      default:
        return {
          title: 'Authentication Error',
          message: 'An error occurred during sign in. Please try again or contact support if the problem persists.'
        };
    }
  };

  const errorDetails = getErrorMessage(error);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>{errorDetails.title}</CardTitle>
          <CardDescription>{errorDetails.message}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" asChild>
              <Link href="/login">Try Again</Link>
            </Button>
            <Button asChild>
              <Link href="/">Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ErrorPage() {

  return (
    <Suspense>
      <ErrorPageContent />
    </Suspense>
  )


}
