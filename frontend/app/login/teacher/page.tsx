import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function TeacherLogin() {
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

      {/* Login Card */}
      <div className="z-10 w-full max-w-md px-4">
        <div className="bg-white rounded-md shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-center text-lg font-semibold text-raider-green mb-4">ATHOLTON HS RAIDER TIME</h1>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username / HCPSS Login
                </label>
                <input
                  id="username"
                  type="text"
                  className="w-full px-3 py-2 border border-raider-gray rounded-sm focus:outline-none focus:ring-1 focus:ring-raider-green"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-3 py-2 border border-raider-gray rounded-sm focus:outline-none focus:ring-1 focus:ring-raider-green"
                />
              </div>
              <div>
                <Button className="w-full bg-raider-green hover:bg-raider-lightgreen text-white">Login</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

