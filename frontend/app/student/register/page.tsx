"use client"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, MapPin, Search, Filter, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function StudentRegistrationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Mock data for available sessions
  const availableSessions = [
    {
      id: 1,
      teacher: "Ms. Rhee",
      subject: "Math",
      room: "B125",
      date: "March 12, 2025",
      time: "9:25 am - 9:55 am",
      capacity: 15,
      enrolled: 8,
      description: "Math help session for Algebra II students",
      tags: ["Algebra", "Test Prep"],
    },
    {
      id: 2,
      teacher: "Mr. Johnson",
      subject: "Science",
      room: "A201",
      date: "March 12, 2025",
      time: "9:25 am - 9:55 am",
      capacity: 20,
      enrolled: 15,
      description: "Biology review session focusing on cellular respiration",
      tags: ["Biology", "Review"],
    },
    {
      id: 3,
      teacher: "Mrs. Davis",
      subject: "English",
      room: "C304",
      date: "March 12, 2025",
      time: "9:25 am - 9:55 am",
      capacity: 15,
      enrolled: 5,
      description: "Essay writing workshop for upcoming assignments",
      tags: ["Writing", "Essays"],
    },
    {
      id: 4,
      teacher: "Dr. Smith",
      subject: "History",
      room: "D105",
      date: "March 19, 2025",
      time: "9:25 am - 9:55 am",
      capacity: 15,
      enrolled: 10,
      description: "Review session for upcoming World History exam",
      tags: ["World History", "Exam Prep"],
    },
  ]

  // Filter sessions based on search query and subject filter
  const filteredSessions = availableSessions.filter((session) => {
    const matchesSearch =
      session.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSubject = subjectFilter === "all" || session.subject.toLowerCase() === subjectFilter.toLowerCase()

    const matchesDate = !selectedDate || session.date === selectedDate

    return matchesSearch && matchesSubject && matchesDate
  })

  // Mock data for registered sessions
  const registeredSessions = [
    {
      id: 1,
      teacher: "Ms. Rhee",
      subject: "Math",
      room: "B125",
      date: "March 5, 2025",
      time: "9:25 am - 9:55 am",
      status: "completed",
      description: "Math help session for Algebra II students",
    },
    {
      id: 2,
      teacher: "Mr. Johnson",
      subject: "Science",
      room: "A201",
      date: "March 12, 2025",
      time: "9:25 am - 9:55 am",
      status: "upcoming",
      description: "Biology review session focusing on cellular respiration",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-raider-blue text-white">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-raider-green text-white">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-raider-red text-white">Cancelled</Badge>
      default:
        return null
    }
  }

  const getAvailabilityBadge = (enrolled: number, capacity: number) => {
    const availableSpots = capacity - enrolled
    if (availableSpots === 0) {
      return <Badge className="bg-raider-red text-white">Full</Badge>
    } else if (availableSpots <= 3) {
      return <Badge className="bg-yellow-500 text-white">Limited ({availableSpots} spots)</Badge>
    } else {
      return <Badge className="bg-raider-green text-white">Available ({availableSpots} spots)</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <MainNav userType="student" />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold dark:text-white">Raider Time Registration</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Register for Raider Time sessions and view your schedule
          </p>
        </div>

        <Tabs defaultValue="available" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="available">Available Sessions</TabsTrigger>
            <TabsTrigger value="registered">My Registered Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by teacher, subject, or keywords..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="math">Math</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                  </SelectContent>
                </Select>
                <Popover open={showFilters} onOpenChange={setShowFilters}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Filter className="h-4 w-4 mr-2" /> Filters
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">Filter Options</h4>
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Select value={selectedDate || ""} onValueChange={(value) => setSelectedDate(value || null)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select date" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Date</SelectItem>
                            <SelectItem value="March 12, 2025">March 12, 2025</SelectItem>
                            <SelectItem value="March 19, 2025">March 19, 2025</SelectItem>
                            <SelectItem value="March 26, 2025">March 26, 2025</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Availability</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="available" />
                          <label
                            htmlFor="available"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Show only available sessions
                          </label>
                        </div>
                      </div>
                      <div className="flex justify-between pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedDate(null)
                            setShowFilters(false)
                          }}
                        >
                          Reset
                        </Button>
                        <Button size="sm" onClick={() => setShowFilters(false)}>
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredSessions.map((session) => (
                <Card key={session.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold">{session.teacher}</CardTitle>
                        <CardDescription>{session.subject}</CardDescription>
                      </div>
                      {getAvailabilityBadge(session.enrolled, session.capacity)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          {session.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-2" />
                          {session.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="h-4 w-4 mr-2" />
                          Room {session.room}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Users className="h-4 w-4 mr-2" />
                          {session.enrolled} / {session.capacity} students
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300">{session.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {session.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-100 dark:bg-gray-800">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Button
                          className="w-full bg-raider-green hover:bg-raider-lightgreen text-white"
                          disabled={session.enrolled >= session.capacity}
                        >
                          {session.enrolled >= session.capacity ? "Session Full" : "Register"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="registered">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {registeredSessions.map((session) => (
                <Card key={session.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-bold">{session.teacher}</CardTitle>
                        <CardDescription>{session.subject}</CardDescription>
                      </div>
                      {getStatusBadge(session.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          {session.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-2" />
                          {session.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="h-4 w-4 mr-2" />
                          Room {session.room}
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300">{session.description}</p>

                      <div className="pt-2">
                        {session.status === "upcoming" ? (
                          <Button variant="outline" className="w-full text-raider-red border-raider-red">
                            Cancel Registration
                          </Button>
                        ) : (
                          <div className="flex items-center justify-center text-raider-green dark:text-green-400">
                            <CheckCircle2 className="h-5 w-5 mr-2" />
                            <span>Completed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}