"use client"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Edit, Trash2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { OpenRoomDialog } from "@/components/open-room-dialog"

export default function TeacherSessionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data for sessions
  const sessions = [
    {
      id: 1,
      room: "B125",
      date: "March 12, 2025",
      time: "9:25 am - 9:55 am",
      capacity: 15,
      enrolled: 8,
      status: "upcoming",
      description: "Math help session for Algebra II students",
    },
    {
      id: 2,
      room: "B125",
      date: "March 19, 2025",
      time: "9:25 am - 9:55 am",
      capacity: 15,
      enrolled: 15,
      status: "upcoming",
      description: "Math help session for Algebra II students",
    },
    {
      id: 3,
      room: "B125",
      date: "March 5, 2025",
      time: "9:25 am - 9:55 am",
      capacity: 15,
      enrolled: 12,
      status: "completed",
      description: "Math help session for Algebra II students",
    },
    {
      id: 4,
      room: "B125",
      date: "February 26, 2025",
      time: "9:25 am - 9:55 am",
      capacity: 15,
      enrolled: 10,
      status: "completed",
      description: "Math help session for Algebra II students",
    },
  ]

  // Filter sessions based on search query and status filter
  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || session.status === statusFilter

    return matchesSearch && matchesStatus
  })

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <MainNav userType="teacher" />

      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">Session Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your Raider Time sessions and track attendance
            </p>
          </div>
          <OpenRoomDialog />
        </div>

        <Tabs defaultValue="sessions" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="sessions">My Sessions</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Records</TabsTrigger>
          </TabsList>

          <TabsContent value="sessions">
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search sessions..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sessions</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredSessions.map((session) => (
                <Card key={session.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold">Room {session.room}</CardTitle>
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
                          <Users className="h-4 w-4 mr-2" />
                          {session.enrolled} / {session.capacity} students
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300">{session.description}</p>

                      <div className="flex justify-between pt-2">
                        {session.status === "upcoming" ? (
                          <>
                            <Button variant="outline" size="sm" className="text-raider-blue border-raider-blue">
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-raider-red border-raider-red">
                              <Trash2 className="h-4 w-4 mr-1" /> Cancel
                            </Button>
                          </>
                        ) : (
                          <Button variant="outline" size="sm" className="text-raider-green border-raider-green">
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="attendance">
            <AttendanceRecords />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function AttendanceRecords() {
  // Mock data for attendance records
  const attendanceRecords = [
    {
      id: 1,
      date: "March 5, 2025",
      room: "B125",
      time: "9:25 am - 9:55 am",
      students: [
        { id: 1, name: "John Smith", status: "present" },
        { id: 2, name: "Sarah Johnson", status: "present" },
        { id: 3, name: "Michael Brown", status: "absent" },
        { id: 4, name: "Emily Davis", status: "late" },
        { id: 5, name: "James Wilson", status: "present" },
      ],
    },
    {
      id: 2,
      date: "February 26, 2025",
      room: "B125",
      time: "9:25 am - 9:55 am",
      students: [
        { id: 1, name: "John Smith", status: "present" },
        { id: 2, name: "Sarah Johnson", status: "absent" },
        { id: 3, name: "Michael Brown", status: "present" },
        { id: 4, name: "Emily Davis", status: "present" },
        { id: 5, name: "James Wilson", status: "present" },
      ],
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500 text-white">Present</Badge>
      case "absent":
        return <Badge className="bg-red-500 text-white">Absent</Badge>
      case "late":
        return <Badge className="bg-yellow-500 text-white">Late</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {attendanceRecords.map((record) => (
        <Card key={record.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              {record.date} - Room {record.room}
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">{record.time}</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-4 py-2 text-left">Student</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {record.students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-3">{student.name}</td>
                      <td className="px-4 py-3">{getStatusBadge(student.status)}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" className="text-raider-green border-raider-green">
                Export Attendance
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
