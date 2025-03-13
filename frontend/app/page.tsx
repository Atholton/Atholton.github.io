import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted">
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-6">
        <h1 className="text-center text-2xl font-bold text-raider-green mb-6">ATHOLTON HS RAIDER TIME</h1>

        <div className="space-y-4">
          <Link href="/login/student" className="block">
            <Button className="w-full bg-raider-green hover:bg-raider-lightgreen text-white h-12">Student Login</Button>
          </Link>

          <Link href="/login/teacher" className="block">
            <Button className="w-full bg-raider-green hover:bg-raider-lightgreen text-white h-12">Teacher Login</Button>
          </Link>

          <Link href="/guest" className="block">
            <Button variant="outline" className="w-full h-12">
              Continue as Guest
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

