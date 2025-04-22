"use client"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect } from "react"

export default function TeacherAllPage() {
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

  const requests = [
    { name: "John Smith", date: "3/12/2025", status: "Pending" },
    { name: "Sarah Johnson", date: "3/12/2025", status: "Approved" },
    { name: "Michael Brown", date: "3/12/2025", status: "Denied" },
    { name: "Emily Davis", date: "3/12/2025", status: "Pending" },
    { name: "James Wilson", date: "3/12/2025", status: "Approved" },
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "denied":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <MainNav userType="teacher" />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-gray-50 dark:bg-gray-900 py-6 px-4 rounded-md">
          <div className="text-center">
            {/* First row: ATHOLTON HIGH SCHOOL */}
            <h1 className="school-title-gradient mb-0 leading-none">ATHOLTON HIGH SCHOOL</h1>

            {/* Second row: RAIDER TIME TEACHER HOME */}
            <div className="flex flex-wrap justify-center items-center">
              <h2 className="school-title-green leading-none">RAIDER TIME</h2>
              <h2 className="school-title-outline leading-none ml-3">TEACHER HOME</h2>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          {/* My Open Rooms Section */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">My Open Rooms</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 min-h-[200px] transition-colors duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-md p-4 hover:border-raider-green dark:hover:border-green-500 transition-colors"
                  >
                    <div className="text-sm text-gray-600 dark:text-gray-400">Room B12{index + 1}</div>
                    <div className="font-medium dark:text-white">Period {index + 1}</div>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">
                        {index === 0 ? "Available" : index === 1 ? "Full" : "Limited"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* My 2nd Period Students Section */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">My 2nd Period Students</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-md p-4 hover:border-raider-green dark:hover:border-green-500 transition-colors"
                  >
                    <div>
                      <div className="font-medium dark:text-white">Student {index + 1}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">ID: {1000 + index}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-raider-green hover:text-raider-green/80 dark:text-green-400 dark:hover:text-green-500"
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* My Requests Section */}
          <section>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">My Requests</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
              <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-raider-green text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Student Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {requests.map((request, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{request.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{request.date}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(
                              request.status,
                            )}`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            variant="outline"
                            className="text-xs border-raider-green text-raider-green hover:bg-raider-green hover:text-white dark:border-green-500 dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-white"
                          >
                            View Details
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