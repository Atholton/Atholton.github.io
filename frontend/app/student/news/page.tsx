"use client"

import { MainNav } from "@/components/main-nav"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

export default function StudentNewsPage() {
  // Mock data for news articles
  const featuredArticle = {
    title: "MS RHEE WINS TEACHER OF THE YEAR",
    date: new Date("2025-04-03T10:37:00"),
    image: "/placeholder.svg?height=300&width=400",
    preview: "preview",
    slug: "ms-rhee-wins-teacher-of-year",
  }

  const articles = [
    {
      title: "SAMPLE TITLE",
      date: new Date("2025-04-03T12:37:00"),
      image: "/placeholder.svg?height=200&width=300",
      preview: "preview",
      slug: "sample-title-1",
    },
    {
      title: "SAMPLE TITLE",
      date: new Date("2025-04-03T10:37:00"),
      image: "/placeholder.svg?height=200&width=300",
      preview: "preview",
      slug: "sample-title-2",
    },
    {
      title: "SAMPLE TITLE",
      date: new Date("2025-04-03T10:37:00"),
      image: "/placeholder.svg?height=200&width=300",
      preview: "preview",
      slug: "sample-title-3",
    },
    {
      title: "SAMPLE TITLE",
      date: new Date("2025-04-03T10:37:00"),
      image: "/placeholder.svg?height=200&width=300",
      preview: "preview",
      slug: "sample-title-4",
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
      <MainNav userType="student" />

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
                  <h1 className="text-4xl font-bold dark:text-white">Bob</h1>
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

        {/* News Header */}
        <h2 className="text-3xl font-bold mb-6 dark:text-white">ATHOLTON STUDENT NEWS</h2>
        <h3 className="text-2xl font-bold mb-6 dark:text-white">LATEST</h3>

        {/* Featured Article */}
        <Link href={`/student/news/${featuredArticle.slug}`} className="block mb-8">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={featuredArticle.image || "/placeholder.svg"}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">{featuredArticle.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{formatDate(featuredArticle.date)}</p>
                <p className="text-gray-600 dark:text-gray-300">{featuredArticle.preview}</p>
              </CardContent>
            </div>
          </Card>
        </Link>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {articles.map((article, index) => (
            <Link key={index} href={`/student/news/${article.slug}`} className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-1 dark:text-white">{article.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{formatDate(article.date)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{article.preview}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
