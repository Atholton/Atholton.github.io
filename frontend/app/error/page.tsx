"use client"

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    // Log the error for monitoring
    if (error) {
      console.error('Auth error:', error)
    }
  }, [error])

  const getErrorMessage = () => {
    switch (error) {
      case 'AccessDenied':
        return 'Access denied. You may not have the correct permissions.'
      case 'Verification':
        return 'Email verification failed. Please use your HCPSS email.'
      case 'OAuthSignin':
        return 'Could not sign in with Google. Please try again.'
      case 'OAuthCallback':
        return 'Error during Google sign-in. Please try again.'
      case 'RoleMismatch':
        return 'You are not authorized to access this section.'
      default:
        return 'An error occurred during sign in. Please try again.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Authentication Error
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {getErrorMessage()}
          </p>
          <div className="space-y-4">
            <Button
              asChild
              className="w-full bg-raider-green hover:bg-raider-lightgreen dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <Link href="/login/teacher">
                Return to Teacher Login
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full"
            >
              <Link href="/login/student">
                Go to Student Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
