"use client"

import type React from "react"

import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { ImagePlus, ArrowLeft, Calendar, Clock, Tags, Globe } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function CreateNewsPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPublic, setIsPublic] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Reset form
      setTitle("")
      setContent("")
      setIsSubmitting(false)

      // Show success message or redirect
      alert("News post created successfully!")
      // In a real app, you would redirect to the news page or the newly created post
      // window.location.href = "/teacher/news";
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <MainNav userType="teacher" />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/teacher/news">
            <Button variant="ghost" className="pl-0 flex items-center text-raider-green dark:text-green-400">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold dark:text-white">Create News Post</CardTitle>
                <CardDescription>
                  Share announcements, achievements, and updates with the school community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Post Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter news title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-white dark:bg-gray-800"
                    />
                  </div>

                  <Tabs defaultValue="write" className="w-full">
                    <TabsList className="mb-2">
                      <TabsTrigger value="write">Write</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="write">
                      <div className="space-y-2">
                        <Label htmlFor="content">Post Content</Label>
                        <Textarea
                          id="content"
                          placeholder="Write your news content here..."
                          className="min-h-[300px] bg-white dark:bg-gray-800"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="preview">
                      <div className="border rounded-md p-4 min-h-[300px] bg-white dark:bg-gray-800">
                        <h3 className="text-xl font-bold mb-4 dark:text-white">{title || "Post Title"}</h3>
                        <div className="prose dark:prose-invert max-w-none">
                          {content ? (
                            <p className="dark:text-gray-300">{content}</p>
                          ) : (
                            <p className="text-gray-400 dark:text-gray-500 italic">
                              Your post preview will appear here...
                            </p>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="space-y-2">
                    <Label>Featured Image</Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 text-center">
                      <Button type="button" variant="outline" className="flex items-center gap-2 mx-auto">
                        <ImagePlus className="h-4 w-4" />
                        Upload Image
                      </Button>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Supports JPG, PNG, GIF up to 5MB</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline">
                      Save Draft
                    </Button>
                    <Button
                      type="submit"
                      className="bg-raider-green hover:bg-raider-lightgreen text-white px-8"
                      disabled={isSubmitting || !title.trim() || !content.trim()}
                    >
                      {isSubmitting ? "Publishing..." : "Publish Post"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold dark:text-white">Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="visibility" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Public Post
                    </Label>
                    <Switch id="visibility" checked={isPublic} onCheckedChange={setIsPublic} />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isPublic
                      ? "This post will be visible to all students and staff"
                      : "This post will only be visible to staff"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Publication Date
                  </Label>
                  <Input type="date" className="bg-white dark:bg-gray-800" />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Publication Time
                  </Label>
                  <Input type="time" className="bg-white dark:bg-gray-800" />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Tags className="h-4 w-4" />
                    Categories
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {["Announcements", "Events", "Sports", "Academics", "Arts"].map((category) => (
                      <Button key={category} variant="outline" size="sm" className="text-xs">
                        {category}
                      </Button>
                    ))}
                    <Button variant="outline" size="sm" className="text-xs">
                      + Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold dark:text-white">Publishing Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Use a clear, descriptive title</li>
                  <li>• Include relevant details in the first paragraph</li>
                  <li>• Add images to make your post more engaging</li>
                  <li>• Proofread your content before publishing</li>
                  <li>• Use categories to help students find your post</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}