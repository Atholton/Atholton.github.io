"use client"

import { MainNav } from "@/components/main-nav"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { PlusCircle } from "lucide-react"

export default function TeacherNewsPage() {
  // Mock data for news articles
  const articles = [
    {
      title: "MS RHEE WINS TEACHER OF THE YEAR",
      date: new Date("2025-04-03T10:37:00"),
      image: "/images/atholton-aerial.png",
      preview:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      slug: "ms-rhee-wins-teacher-of-year-1",
    },
    {
      title: "MS RHEE WINS TEACHER OF THE YEAR",
      date: new Date("2025-04-03T10:37:00"),
      image: "/images/atholton-aerial.png",
      preview:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      slug: "ms-rhee-wins-teacher-of-year-2",
    },
    {
      title: "MS RHEE WINS TEACHER OF THE YEAR",
      date: new Date("2025-04-03T10:37:00"),
      image: "/images/atholton-aerial.png",
      preview:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
      slug: "ms-rhee-wins-teacher-of-year-3",
    },
  ]

  // Format date as "WEEKDAY MONTH DD, YYYY"
  const currentDate = new Date()
  const formattedDate = currentDate
    .toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase()

  // Split the date into parts for styling
  const dateParts = formattedDate.split(" ")
  const weekday = dateParts[0]
  const month = dateParts[1]
  const day = dateParts[2].replace(",", "")
  const year = dateParts[3]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <MainNav userType="teacher" />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <Card className="mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-2/5 h-64 md:h-auto flex-shrink-0">
              <Image
                src="/images/atholton-aerial.png"
                alt="Atholton High School Aerial View"
                fill
                className="object-contain md:object-cover"
                style={{ objectPosition: "center" }}
              />
            </div>
            <CardContent className="flex-1 p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <p className="text-xl text-gray-600 dark:text-gray-400">Welcome</p>
                  <h1 className="text-4xl font-bold dark:text-white">MR. SMITH</h1>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-raider-green dark:text-green-400 font-mono">
                    {weekday}
                    <br />
                    {month} {day}, {year}
                  </p>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* News Header with Create Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold dark:text-white">TEACHER NEWS</h2>
          <Link href="/teacher/news/create">
            <Button className="bg-raider-green hover:bg-raider-lightgreen text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create News Post
            </Button>
          </Link>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles.map((article, index) => (
            <Link key={index} href={`/teacher/news/${article.slug}`} className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{formatDate(article.date)}</p>
                  <h3 className="text-lg font-bold mb-1 dark:text-white">{article.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{article.preview}</p>
                  <p className="text-xs text-raider-green dark:text-green-400 font-semibold">LOAD MORE</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Create News Post CTA */}
        <Card className="bg-gray-100 dark:bg-gray-800 border-dashed border-2 border-gray-300 dark:border-gray-600">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Want to share news with the school?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Create a news post to share announcements, achievements, and updates with students and staff.
            </p>
            <Link href="/teacher/news/create">
              <Button className="bg-raider-green hover:bg-raider-lightgreen text-white px-8">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create News Post
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
