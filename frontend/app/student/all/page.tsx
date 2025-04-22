"use client"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useEffect } from "react"

export default function StudentAllPage() {
  // Load the Platypi font style if needed
  useEffect(() => {
    // This font loading script is only executed client-side
    const loadFont = async () => {
      if (typeof window !== "undefined") {
        const style = document.createElement("style")
        style.textContent = `
          @font-face {
            font-family: 'Platypi';
            src: url('/fonts/Platypi-Bold.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
        `
        document.head.appendChild(style)
      }
    }

    loadFont()
  }, [])

  const teachers = [
    { name: "Ms. Rhee", room: "B125" },
    { name: "Mr. Johnson", room: "A201" },
    { name: "Mrs. Davis", room: "C304" },
    { name: "Dr. Smith", room: "D105" },
    { name: "Ms. Wilson", room: "B127" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <MainNav userType="student" />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-gray-50 dark:bg-gray-900 py-6 px-4 rounded-md">
          <div className="text-center">
            {/* First row: ATHOLTON HIGH SCHOOL */}
            <h1 className="school-title-gradient mb-0 leading-none">ATHOLTON HIGH SCHOOL</h1>

            {/* Second row: RAIDER TIME HOME PAGE */}
            <div className="flex flex-wrap justify-center items-center">
              <h2 className="school-title-green leading-none">RAIDER TIME</h2>
              <h2 className="school-title-outline leading-none ml-3">HOME PAGE</h2>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          {/* My Classes Section */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">My Classes</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-h-[200px] transition-colors duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-md p-4 hover:border-raider-green dark:hover:border-green-500 transition-colors"
                  >
                    <div className="text-sm text-gray-600 dark:text-gray-400">Period {index + 1}</div>
                    <div className="font-medium dark:text-white">Available</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Open Rooms Section */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Open Rooms</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-h-[200px] transition-colors duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-md p-4 hover:border-raider-green dark:hover:border-green-500 transition-colors"
                  >
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Room {String.fromCharCode(65 + index)}100
                    </div>
                    <div className="font-medium dark:text-white">Available</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Search/Request Section */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Search/Request for a Teacher</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
              <div className="mb-6">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search for Teachers for Raider Time"
                    className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
                </div>
              </div>

              <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-raider-green text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Teacher</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Room</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {teachers.map((teacher, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{teacher.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{teacher.room}</td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            variant="outline"
                            className="text-xs border-raider-green text-raider-green hover:bg-raider-green hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white"
                          >
                            Request
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
