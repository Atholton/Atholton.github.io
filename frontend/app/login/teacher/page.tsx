"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { GoogleSignInButton } from "@/components/google-sign-in-button"
import { useRouter } from "next/router"

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
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium dark:text-gray-200">
                  Username / HCPSS Login
                </label>
                <input
                  id="username"
                  type="text"
                  className="w-full px-3 py-2 border border-raider-gray dark:border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-raider-green dark:focus:ring-green-500 bg-white dark:bg-gray-700 text-black dark:text-white transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium dark:text-gray-200">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-3 py-2 border border-raider-gray dark:border-gray-600 rounded-sm focus:outline-none focus:ring-1 focus:ring-raider-green dark:focus:ring-green-500 bg-white dark:bg-gray-700 text-black dark:text-white transition-colors"
                />
              </div>
              <div className="space-y-4">
                <Button className="w-full bg-raider-green hover:bg-raider-lightgreen dark:bg-raider-darkgray dark:hover:bg-gray-700 text-white transition-colors">
                  Login
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300 dark:border-gray-600"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <GoogleSignInButton />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
