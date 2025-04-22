"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted dark:bg-gray-900 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {mounted && theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-md shadow-md p-6 transition-colors duration-300">
        <h1 className="text-center text-2xl font-bold text-raider-green dark:text-green-400 mb-6 transition-colors">
          ATHOLTON HS RAIDER TIME
        </h1>

        <div className="space-y-4">
          <Link href="/login/student" className="block">
            <Button className="w-full bg-raider-green hover:bg-raider-lightgreen dark:bg-raider-darkgray dark:hover:bg-gray-700 text-white h-12 transition-colors">
              Student Login
            </Button>
          </Link>

          <Link href="/login/teacher" className="block">
            <Button className="w-full bg-raider-green hover:bg-raider-lightgreen dark:bg-raider-darkgray dark:hover:bg-gray-700 text-white h-12 transition-colors">
              Teacher Login
            </Button>
          </Link>

          <Link href="/guest" className="block">
            <Button
              variant="outline"
              className="w-full h-12 border-raider-green dark:border-gray-600 text-raider-green dark:text-gray-200 hover:bg-raider-green/10 dark:hover:bg-gray-700 transition-colors"
            >
              Continue as Guest
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}