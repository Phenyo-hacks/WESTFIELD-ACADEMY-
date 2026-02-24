"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCheck, CalendarIcon, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext" // Import useAuth

interface AttendanceRecord {
  id: number
  studentId: string
  studentName: string
  status: "Present" | "Absent" | "Late" | "Excused"
  date: string
  class: string
  subject: string
}

interface Student {
  id: number
  studentId: string
  name: string
  class: string
  attendanceRate: number
}

const mockStudents: Student[] = [
  { id: 1, studentId: "STU2024001", name: "John Davidson", class: "10A", attendanceRate: 94.5 },
  { id: 2, studentId: "STU2024002", name: "Sarah Mitchell", class: "10A", attendanceRate: 98.2 },
  { id: 3, studentId: "STU2024003", name: "Michael Johnson", class: "11B", attendanceRate: 87.3 },
  { id: 4, studentId: "STU2024004", name: "Emily Davis", class: "11B", attendanceRate: 91.8 },
  { id: 5, studentId: "STU2024005", name: "David Wilson", class: "10A", attendanceRate: 96.1 },
  { id: 6, studentId: "STU2024006", name: "Lisa Brown", class: "11B", attendanceRate: 89.4 },
  { id: 7, studentId: "STU2024007", name: "Chris Green", class: "9A", attendanceRate: 92.0 },
  { id: 8, studentId: "STU2024008", name: "Olivia White", class: "9A", attendanceRate: 95.5 },
]

export default function AttendanceSystem() {
  const { user } = useAuth() // Get current user
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedClass, setSelectedClass] = useState(user?.role === "Teacher" ? "10A" : "10A") // Default to 10A for teacher
  const [selectedSubject, setSelectedSubject] = useState("Mathematics")
  const [attendance, setAttendance] = useState<{ [key: number]: "Present" | "Absent" | "Late" | "Excused" }>({})

  // Define classes a mock teacher (Prof. Robert Johnson) teaches
  const teacherClasses = ["10A", "11B"]

  const studentsForSelectedClass = mockStudents.filter((student) => {
    // If user is a teacher, only show students from their assigned classes
    if (user?.role === "Teacher" && !teacherClasses.includes(student.class)) {
      return false
    }
    return student.class === selectedClass
  })

  const handleAttendanceChange = (studentId: number, status: "Present" | "Absent" | "Late" | "Excused") => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-700 border-green-200"
      case "Absent":
        return "bg-red-100 text-red-700 border-red-200"
      case "Late":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Excused":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Absent":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "Late":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "Excused":
        return <AlertCircle className="w-4 h-4 text-blue-600" />
      default:
        return null
    }
  }

  const getAttendanceRateColor = (rate: number) => {
    if (rate >= 95) return "text-green-600"
    if (rate >= 85) return "text-yellow-600"
    return "text-red-600"
  }

  const presentCount = Object.values(attendance).filter((status) => status === "Present").length
  const absentCount = Object.values(attendance).filter((status) => status === "Absent").length
  const lateCount = Object.values(attendance).filter((status) => status === "Late").length
  const totalMarked = Object.keys(attendance).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600">Track and manage student attendance</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Generate Report</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Attendance</p>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+2.1% from last week</span>
                </div>
              </div>
              <UserCheck className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Present Today</p>
                <p className="text-2xl font-bold text-green-600">{presentCount}</p>
                <p className="text-sm text-gray-500">out of {studentsForSelectedClass.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Absent Today</p>
                <p className="text-2xl font-bold text-red-600">{absentCount}</p>
                <p className="text-sm text-gray-500">students</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Late Arrivals</p>
                <p className="text-2xl font-bold text-yellow-600">{lateCount}</p>
                <p className="text-sm text-gray-500">students</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Marking */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mark Attendance</CardTitle>
            <div className="flex flex-wrap gap-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {user?.role === "Teacher" ? (
                    // If teacher, show only their classes
                    teacherClasses.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        Class {cls}
                      </SelectItem>
                    ))
                  ) : (
                    // If admin, show all classes
                    <>
                      <SelectItem value="10A">Class 10A</SelectItem>
                      <SelectItem value="10B">Class 10B</SelectItem>
                      <SelectItem value="11A">Class 11A</SelectItem>
                      <SelectItem value="11B">Class 11B</SelectItem>
                      <SelectItem value="9A">Class 9A</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>

              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <CalendarIcon className="w-4 h-4" />
                <span>{selectedDate.toLocaleDateString()}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentsForSelectedClass.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.studentId}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className={`text-sm font-medium ${getAttendanceRateColor(student.attendanceRate)}`}>
                      {student.attendanceRate}%
                    </div>
                    <div className="flex space-x-1">
                      {(["Present", "Absent", "Late", "Excused"] as const).map((status) => (
                        <Button
                          key={status}
                          variant={attendance[student.id] === status ? "default" : "outline"}
                          size="sm"
                          className={`h-8 px-3 ${
                            attendance[student.id] === status
                              ? status === "Present"
                                ? "bg-green-600 hover:bg-green-700"
                                : status === "Absent"
                                  ? "bg-red-600 hover:bg-red-700"
                                  : status === "Late"
                                    ? "bg-yellow-600 hover:bg-yellow-700"
                                    : "bg-blue-600 hover:bg-blue-700"
                              : ""
                          }`}
                          onClick={() => handleAttendanceChange(student.id, status)}
                        >
                          {getStatusIcon(status)}
                          <span className="ml-1 text-xs">{status}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalMarked > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-blue-800">
                    Attendance marked for {totalMarked} out of {studentsForSelectedClass.length} students
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Attendance</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Calendar and Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Low Attendance Alert</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studentsForSelectedClass
                  .filter((student) => student.attendanceRate < 90)
                  .map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-red-100 text-red-600 text-xs">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-red-800">{student.name}</p>
                          <p className="text-xs text-red-600">{student.class}</p>
                        </div>
                      </div>
                      <Badge className="bg-red-100 text-red-700 border-red-200">{student.attendanceRate}%</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
