"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function TeacherLogin() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <main className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/teacher_log_in_background-4XoBAnFHorJ70ktDq3dvsslbF2XEEC.png"
          alt="Atholton High School Building"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>

      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {mounted && theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
      </div>

      {/* Login Card */}
      <div className="z-10 w-full max-w-md px-4">
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-md overflow-hidden transition-colors duration-300">
          <div className="p-6">
            <h1 className="text-center text-lg font-semibold text-raider-green dark:text-green-400 mb-4 transition-colors">
              ATHOLTON HS RAIDER TIME
            </h1>
            <div className="space-y-4">
              <Button
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    const result = await signIn('google', {
                      callbackUrl: '/teacher',
                      redirect: true
                    });
                  } catch (error) {
                    console.error('Login failed:', error);
                  } finally {
                    setIsLoading(false);
                  }
                }}
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600 transition-colors flex items-center justify-center gap-2 py-2"
              >
                <Image
                  src="/google.svg"
                  alt="Google logo"
                  width={20}
                  height={20}
                />
                {isLoading ? 'Signing in...' : 'Sign in with Google'}
              </Button>
              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                Use your HCPSS Google account to sign in
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}