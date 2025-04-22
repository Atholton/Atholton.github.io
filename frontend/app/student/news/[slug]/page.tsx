"use client"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"
import { formatDate } from "@/lib/utils"

export default function NewsArticlePage() {
  const params = useParams()
  const slug = params.slug

  // Mock article data - in a real app, you would fetch this based on the slug
  const article = {
    title: slug === "ms-rhee-wins-teacher-of-year" ? "MS RHEE WINS TEACHER OF THE YEAR" : "SAMPLE TITLE",
    date: new Date("2025-04-03T10:37:00"),
    image: "/placeholder.svg?height=500&width=800",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
      <p>Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
    `,
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <MainNav userType="student" />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/student/news">
            <Button variant="ghost" className="pl-0 flex items-center text-raider-green dark:text-green-400">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>
          </Link>
        </div>

        <Card className="overflow-hidden mb-8">
          <div className="relative w-full h-64 md:h-96">
            <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
          </div>
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-2 dark:text-white">{article.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{formatDate(article.date)}</p>
            <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
          </CardContent>
        </Card>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 dark:text-white">More News</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Link key={i} href={`/student/news/sample-title-${i}`} className="block">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-40">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Sample Article"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-1 dark:text-white">SAMPLE TITLE</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Thu, April 3rd, 2025 10:37</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
