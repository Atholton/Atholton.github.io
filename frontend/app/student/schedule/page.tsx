"use client"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ChevronLeft, ChevronRight, Download } from "lucide-react"
import { useState } from "react"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"
import { cn } from "@/lib/utils"

export default function StudentSchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState("week")

  // Calculate the start and end of the current week
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 }) // Start on Monday
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 })

  // Generate array of days for the week view
  const weekDays = eachDayOfInterval({
    start: startOfCurrentWeek,
    end: endOfCurrentWeek,
  }).filter((date) => date.getDay() !== 0 && date.getDay() !== 6) // Exclude weekends

  // Mock data for schedule
  const scheduleData = [
    {
      id: 1,
      title: "Period 1 - AP Calculus",
      teacher: "Ms. Rhee",
      room: "B125",
      time: "7:50 am - 8:35 am",
      days: [1, 2, 3, 4, 5], // Monday to Friday
    },
    {
      id: 2,
      title: "Period 2 - English Literature",
      teacher: "Mrs. Davis",
      room: "C304",
      time: "8:40 am - 9:25 am",
      days: [1, 2, 3, 4, 5],
    },
    {
      id: 3,
      title: "Raider Time",
      teacher: "Various",
      room: "Various",
      time: "9:25 am - 9:55 am",
      days: [1, 2, 3, 4, 5],
      isRaiderTime: true,
    },
    {
      id: 4,
      title: "Period 3 - Physics",
      teacher: "Mr. Johnson",
      room: "A201",
      time: "10:00 am - 10:50 am",
      days: [1, 2, 3, 4, 5],
    },
    {
      id: 5,
      title: "Period 4 - World History",
      teacher: "Dr. Smith",
      room: "D105",
      time: "10:55 am - 12:55 pm",
      days: [1, 2, 3, 4, 5],
    },
    {
      id: 6,
      title: "Period 5 - Spanish",
      teacher: "Sra. Rodriguez",
      room: "B210",
      time: "1:00 pm - 1:45 pm",
      days: [1, 2, 3, 4, 5],
    },
    {
      id: 7,
      title: "Period 6 - Computer Science",
      teacher: "Mr. Chen",
      room: "A105",
      time: "1:50 pm - 2:35 pm",
      days: [1, 2, 3, 4, 5],
    },
  ]

  // Mock data for Raider Time sessions
  const raiderTimeSessions = [
    {
      id: 1,
      title: "Math Help Session",
      teacher: "Ms. Rhee",
      room: "B125",
      date: new Date(2025, 2, 12), // March 12, 2025
      status: "registered",
    },
    {
      id: 2,
      title: "Biology Review",
      teacher: "Mr. Johnson",
      room: "A201",
      date: new Date(2025, 2, 19), // March 19, 2025
      status: "registered",
    },
  ]

  // Function to get classes for a specific day
  const getClassesForDay = (date: Date) => {
    const dayOfWeek = date.getDay() || 7 // Convert Sunday (0) to 7
    return scheduleData.filter((item) => item.days.includes(dayOfWeek))
  }

  // Function to get Raider Time session for a specific day
  const getRaiderTimeForDay = (date: Date) => {
    return raiderTimeSessions.find((session) => isSameDay(session.date, date))
  }

  // Navigate to previous/next week
  const navigatePrevious = () => {
    if (view === "week") {
      setCurrentDate(addDays(currentDate, -7))
    } else {
      setCurrentDate(addDays(currentDate, -1))
    }
  }

  const navigateNext = () => {
    if (view === "week") {
      setCurrentDate(addDays(currentDate, 7))
    } else {
      setCurrentDate(addDays(currentDate, 1))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <MainNav userType="student" />

      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">My Schedule</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">View your class schedule and Raider Time sessions</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Schedule
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <CardTitle>Schedule View</CardTitle>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Button variant="outline" size="icon" onClick={navigatePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm font-medium">
                {view === "week"
                  ? `${format(startOfCurrentWeek, "MMM d")} - ${format(endOfCurrentWeek, "MMM d, yyyy")}`
                  : format(currentDate, "MMMM d, yyyy")}
              </div>
              <Button variant="outline" size="icon" onClick={navigateNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="week" className="w-full" onValueChange={setView}>
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="day">Day</TabsTrigger>
                </TabsList>
                <Button variant="ghost" className="flex items-center gap-1" onClick={() => setCurrentDate(new Date())}>
                  <CalendarIcon className="h-4 w-4" />
                  Today
                </Button>
              </div>

              <TabsContent value="week">
                <div className="grid grid-cols-5 gap-4">
                  {weekDays.map((day, index) => (
                    <div key={index} className="flex flex-col">
                      <div
                        className={cn(
                          "text-center p-2 font-medium rounded-t-md",
                          isSameDay(day, new Date())
                            ? "bg-raider-green text-white dark:bg-green-700"
                            : "bg-gray-100 dark:bg-gray-800",
                        )}
                      >
                        <div>{format(day, "EEE")}</div>
                        <div>{format(day, "MMM d")}</div>
                      </div>
                      <div className="flex-1 border border-gray-200 dark:border-gray-700 rounded-b-md p-2 space-y-2">
                        {getClassesForDay(day).map((classItem) => {
                          const raiderTimeSession = classItem.isRaiderTime ? getRaiderTimeForDay(day) : null

                          return (
                            <div
                              key={classItem.id}
                              className={cn(
                                "p-2 rounded-md text-sm",
                                classItem.isRaiderTime
                                  ? raiderTimeSession
                                    ? "bg-raider-green/10 border border-raider-green dark:bg-green-900/20 dark:border-green-700"
                                    : "bg-gray-100 dark:bg-gray-800"
                                  : "bg-gray-100 dark:bg-gray-800",
                              )}
                            >
                              <div className="font-medium">{classItem.title}</div>
                              {classItem.isRaiderTime && raiderTimeSession ? (
                                <>
                                  <div>{raiderTimeSession.teacher}</div>
                                  <div>Room {raiderTimeSession.room}</div>
                                  <Badge className="mt-1 bg-raider-green text-white">Registered</Badge>
                                </>
                              ) : (
                                <>
                                  <div>{classItem.teacher}</div>
                                  <div>Room {classItem.room}</div>
                                </>
                              )}
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{classItem.time}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="day">
                <div className="space-y-4">
                  <div
                    className={cn(
                      "text-center p-2 font-medium rounded-md",
                      isSameDay(currentDate, new Date())
                        ? "bg-raider-green text-white dark:bg-green-700"
                        : "bg-gray-100 dark:bg-gray-800",
                    )}
                  >
                    <div className="text-lg">{format(currentDate, "EEEE")}</div>
                    <div>{format(currentDate, "MMMM d, yyyy")}</div>
                  </div>

                  <div className="space-y-3">
                    {getClassesForDay(currentDate).map((classItem) => {
                      const raiderTimeSession = classItem.isRaiderTime ? getRaiderTimeForDay(currentDate) : null

                      return (
                        <Card key={classItem.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-lg">{classItem.title}</h3>
                                {classItem.isRaiderTime && raiderTimeSession ? (
                                  <>
                                    <p className="text-gray-600 dark:text-gray-400">
                                      {raiderTimeSession.title} with {raiderTimeSession.teacher}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">Room {raiderTimeSession.room}</p>
                                    <Badge className="mt-2 bg-raider-green text-white">Registered</Badge>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-gray-600 dark:text-gray-400">{classItem.teacher}</p>
                                    <p className="text-gray-600 dark:text-gray-400">Room {classItem.room}</p>
                                  </>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">{classItem.time}</div>
                                {classItem.isRaiderTime && !raiderTimeSession && (
                                  <Button
                                    variant="link"
                                    className="text-raider-green dark:text-green-400 p-0 h-auto mt-2"
                                  >
                                    Register for session
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Raider Time Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {raiderTimeSessions.length > 0 ? (
                <div className="space-y-4">
                  {raiderTimeSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0"
                    >
                      <div>
                        <h4 className="font-medium">{session.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {session.teacher} - Room {session.room}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {format(session.date, "MMMM d, yyyy")}
                        </p>
                      </div>
                      <Badge className="bg-raider-green text-white">Registered</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No upcoming Raider Time sessions.</p>
              )}
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  View All Sessions
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bell Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scheduleData.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{item.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
