import Link from "next/link"
import { Home, Sun } from "lucide-react"

export function MainNav() {
  return (
    <nav className="bg-gradient-to-r from-raider-green to-raider-lightgreen text-white py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/student" className="text-2xl font-bold">
            STUDENTS
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/login/student" className="hover:opacity-80">
              STUDENT LOGIN
            </Link>
            <Link href="/login/teacher" className="hover:opacity-80">
              TEACHER LOGIN
            </Link>
            <Link href="/news" className="hover:opacity-80">
              NEWS
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:opacity-80">
            <Home className="size-6" />
          </Link>
          <button className="hover:opacity-80">
            <Sun className="size-6" />
          </button>
        </div>
      </div>
    </nav>
  )
}

