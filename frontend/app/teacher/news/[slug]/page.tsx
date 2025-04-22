"use client"

import { Textarea } from "@/components/ui/textarea"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Edit,
  Calendar,
  Clock,
  Share2,
  MessageSquare,
  ThumbsUp,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react"
import { useParams } from "next/navigation"
import { formatDate } from "@/lib/utils"
import { useState } from "react"

export default function NewsArticlePage() {
  const params = useParams()
  const slug = params.slug
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(12)

  // Mock article data - in a real app, you would fetch this based on the slug
  const article = {
    title: slug === "ms-rhee-wins-teacher-of-year-1" ? "MS RHEE WINS TEACHER OF THE YEAR" : "SAMPLE TITLE",
    subtitle: "Recognized for Excellence in Education and Student Mentorship",
    date: new Date("2025-04-03T10:37:00"),
    author: "Mr. Smith",
    authorRole: "English Department",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    readTime: "4 min read",
    viewCount: 243,
    categories: ["Announcements", "Academics", "Awards"],
    image: "/images/atholton-aerial.png",
    content: `
      <p class="text-lg leading-relaxed mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 dark:text-white">About the Award</h2>
      
      <p class="mb-4">Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
      
      <blockquote class="border-l-4 border-raider-green dark:border-green-500 pl-4 italic my-6">
        "Ms. Rhee has demonstrated exceptional dedication to her students and a commitment to educational excellence that goes above and beyond expectations."
      </blockquote>
      
      <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 dark:text-white">Student Impact</h2>
      
      <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
      
      <ul class="list-disc pl-6 mb-6">
        <li class="mb-2">Increased student engagement in classroom activities</li>
        <li class="mb-2">Developed innovative teaching methods</li>
        <li class="mb-2">Mentored new teachers in the department</li>
        <li class="mb-2">Led extracurricular activities and clubs</li>
      </ul>
      
      <p class="mb-4">Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
    `,
  }

  // Mock comments
  const comments = [
    {
      id: 1,
      author: "Jane Doe",
      authorRole: "Science Teacher",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date("2025-04-04T14:23:00"),
      content: "Congratulations to Ms. Rhee! Well-deserved recognition for all her hard work.",
    },
    {
      id: 2,
      author: "John Smith",
      authorRole: "Math Department",
      avatar: "/placeholder.svg?height=40&width=40",
      date: new Date("2025-04-04T15:45:00"),
      content: "This is fantastic news! Ms. Rhee has been an inspiration to all of us in the teaching community.",
    },
  ]

  // Mock related articles
  const relatedArticles = [
    {
      title: "STUDENT SCIENCE FAIR WINNERS ANNOUNCED",
      date: new Date("2025-03-28T09:15:00"),
      image: "/placeholder.svg?height=200&width=300",
      slug: "student-science-fair-winners",
    },
    {
      title: "NEW ATHLETIC FACILITIES OPENING NEXT MONTH",
      date: new Date("2025-04-01T11:30:00"),
      image: "/placeholder.svg?height=200&width=300",
      slug: "new-athletic-facilities",
    },
    {
      title: "SPRING CONCERT SCHEDULE RELEASED",
      date: new Date("2025-03-25T14:20:00"),
      image: "/placeholder.svg?height=200&width=300",
      slug: "spring-concert-schedule",
    },
  ]

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <MainNav userType="teacher" />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link href="/teacher/news">
            <Button variant="ghost" className="pl-0 flex items-center text-raider-green dark:text-green-400">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>
          </Link>

          <Link href={`/teacher/news/edit/${slug}`}>
            <Button variant="outline" className="flex items-center">
              <Edit className="mr-2 h-4 w-4" />
              Edit Post
            </Button>
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {article.categories.map((category, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-raider-green/10 text-raider-green dark:bg-green-900/30 dark:text-green-400"
                >
                  {category}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl font-bold mb-3 dark:text-white">{article.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{article.subtitle}</p>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={article.authorAvatar || "/placeholder.svg"} alt={article.author} />
                  <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium dark:text-white">{article.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{article.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {formatDate(article.date)}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {article.readTime}
                </div>
                <div className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" />
                  {article.viewCount} views
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Actions */}
          <div className="flex justify-between items-center py-4 border-t border-b border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-2 ${liked ? "text-raider-green dark:text-green-400" : ""}`}
                onClick={handleLike}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{likeCount}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{comments.length}</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-2 ${bookmarked ? "text-raider-green dark:text-green-400" : ""}`}
                onClick={handleBookmark}
              >
                <Bookmark className="h-4 w-4" />
                <span>{bookmarked ? "Saved" : "Save"}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>

          {/* Comments Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold mb-6 dark:text-white">Comments ({comments.length})</h3>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium dark:text-white">{comment.author}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {comment.authorRole} • {formatDate(comment.date)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Textarea placeholder="Add a comment..." className="bg-white dark:bg-gray-800 min-h-24" />
              <div className="flex justify-end mt-2">
                <Button className="bg-raider-green hover:bg-raider-lightgreen text-white">Post Comment</Button>
              </div>
            </div>
          </section>

          {/* Author Bio */}
          <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-12">
            <h3 className="text-xl font-bold mb-4 dark:text-white">About the Author</h3>
            <div className="flex items-start">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src={article.authorAvatar || "/placeholder.svg"} alt={article.author} />
                <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-lg dark:text-white">{article.author}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{article.authorRole}</p>
                <p className="text-gray-700 dark:text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies,
                  nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* Related Articles */}
        <section className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold dark:text-white">More News</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((article, index) => (
              <Link key={index} href={`/teacher/news/${article.slug}`} className="block">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-40">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{formatDate(article.date)}</p>
                    <h3 className="text-lg font-bold mb-1 dark:text-white">{article.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/teacher/news">
              <Button
                variant="outline"
                className="border-raider-green text-raider-green hover:bg-raider-green/10 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-900/20"
              >
                View All News
              </Button>
            </Link>
          </div>
        </section>

        {/* Article Navigation */}
        <div className="max-w-4xl mx-auto mt-12 border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex justify-between">
            <Link href="/teacher/news/previous-article">
              <Button variant="ghost" className="flex items-center">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous Article
              </Button>
            </Link>
            <Link href="/teacher/news/next-article">
              <Button variant="ghost" className="flex items-center">
                Next Article
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}