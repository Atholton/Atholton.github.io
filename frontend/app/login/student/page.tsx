"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { GoogleSignInButton } from "@/components/ui/google-signin-button"

export default function StudentLogin() {
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
    <main className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/student_log_in_background-qAPrsMHi6ul4JGC5WDQfGWFgzM4UyZ.png"
          alt="Students at Atholton High School"
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>

      {/* Theme Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 z-50"
        onClick={toggleTheme}
      >
        {mounted && theme === "dark" ? <Sun /> : <Moon />}
      </Button>

      {/* Login Form */}
      <div className="z-10 w-full max-w-md p-8 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg">
        <div className="flex flex-col items-center space-y-6">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ahs_logo-7LPD4mBXXlvBXyR1QNwLPxWQPRXTxp.png"
            alt="Atholton High School Logo"
            width={120}
            height={120}
            className="rounded-full bg-white p-2"
          />
          <h1 className="text-2xl font-bold text-foreground">Student Login</h1>
          
          {/* Google Sign-In Button */}
          <GoogleSignInButton className="w-full" redirectUrl="/student" />
          
          <p className="text-sm text-muted-foreground text-center">
            Please sign in with your HCPSS account (@inst.hcpss.org)
          </p>
        </div>
      </div>
    </main>
  )
}
