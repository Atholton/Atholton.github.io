'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type ExtendedSession = {
  user?: {
    email?: string | null
    name?: string | null
    userRole?: 'student' | 'teacher'
  }
}

export function RoleRedirect() {
  const { data: session, status } = useSession() as { data: ExtendedSession | null, status: 'loading' | 'authenticated' | 'unauthenticated' }
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') {
      return // Wait for session to load
    }

    if (!session) {
      return // Let the page handle unauthenticated state
    }

    const userRole = session.user?.userRole
    if (userRole === 'student') {
      router.push('/student')
    } else if (userRole === 'teacher') {
      router.push('/teacher')
    }
  }, [session, status, router])

  return null // This component doesn't render anything
}
