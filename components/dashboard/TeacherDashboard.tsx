"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Calendar, FileText, Bell, ChevronRight, Clock, AlertCircle, CheckCircle, XCircle, Award } from 'lucide-react'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const classPerformanceData = [
  { name: "Applied Physics", avgGrade: 88 },
  { name: "Organic Chemistry", avgGrade: 82 },
  { name: "Advanced Math", avgGrade: 91 },
  { name: "English Lit", avgGrade: 85 },
]

// Mock data for students taught by Prof. Robert Johnson
const mockTeacherStudents = [
  { id: 1, name: "John Davidson", class: "10A", recentGrade: "B+", recentAttendance: "Present" },
  { id: 2, name: "Sarah Mitchell", class: "10A", recentGrade: "A", recentAttendance: "Present" },
  { id: 3, name: "Michael Johnson", class: "11B", recentGrade: "C", recentAttendance: "Late" },
  { id: 4, name: "Emily Davis", class: "11B", recentGrade: "A-", recentAttendance: "Absent" },
  { id: 5, name: "David Wilson", class: "10A", recentGrade: "B", recentAttendance: "Present" },
]

export default function TeacherDashboard() {
  const teacherName = "Prof. Robert Johnson" // Mock teacher name

  const getGradeColor = (gradeLetter: string) => {
    switch (
      gradeLetter[0] // Check first character for A, B, C, etc.
    ) {
      case "A":
        return "bg-green-100 text-green-700 border-green-200"
      case "B":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "C":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "D":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "F":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getAttendanceColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-700 border-green-200"
      case "Absent":
        return "bg-red-100 text-red-700 border-red-200"
      case "Late":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header with Classroom Image */}
      <div className="relative bg-white p-6 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div
          className="absolute right-0 top-0 w-1/3 h-full bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/images/classroom-scene.png')",
          }}
        ></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {teacherName}!</h1>
          <p className="text-gray-600 mt-1">Your personalized teaching portal.</p>
        </div>
      </div>

      {/* Quick Stats for Teacher */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">My Classes</p>
                <p className="text-3xl font-bold text-gray-900">5</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">{mockTeacherStudents.length}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Grades</p>
                <p className="text-3xl font-bold text-orange-600">15</p>
              </div>
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                <p className="text-3xl font-bold text-purple-600">3</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Classes Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                My Current Classes
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mock Class 1 */}
                <Card className="relative overflow-hidden">
                  <div
                    className="h-24 bg-gradient-to-br from-blue-600 to-blue-800 bg-cover bg-center"
                    style={{
                      backgroundImage: "url('/images/science-lab.png')",
                    }}
                  >
                    <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Applied Physics</h3>
                    <p className="text-sm text-gray-600 mb-2">PHYS301 2024 FT • Grade 11B</p>
                    <p className="text-xs text-blue-600">Next: Tuesday, 10:30 AM • Lab 2</p>
                  </CardContent>
                </Card>
                {/* Mock Class 2 */}
                <Card className="relative overflow-hidden">
                  <div
                    className="h-24 bg-gradient-to-br from-green-600 to-green-800 bg-cover bg-center"
                    style={{
                      backgroundImage: "url('/images/science-lab.png')",
                    }}
                  >
                    <div className="absolute inset-0 bg-green-900 bg-opacity-60"></div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Organic Chemistry</h3>
                    <p className="text-sm text-gray-600 mb-2">CHEM201 2024 FT • Grade 10A</p>
                    <p className="text-xs text-blue-600">Next: Wednesday, 2:00 PM • Lab 1</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Pending Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Pending Actions
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-800">Grade "Algebra II Quiz"</p>
                    <p className="text-xs text-orange-600">Due: May 20, 2025 • Advanced Mathematics</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Grade
                  </Button>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <Clock className="w-5 h-5 text-red-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800">Mark "Physics Lab" Attendance</p>
                    <p className="text-xs text-red-600">Overdue: May 15, 2025 • Applied Physics</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Mark
                  </Button>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-800">New Announcement Draft</p>
                    <p className="text-xs text-blue-600">Draft for "Summer Break Schedule"</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Class Rosters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                My Class Rosters
                <Button variant="ghost" size="sm">
                  View All Students <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTeacherStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-600">Class {student.class}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getGradeColor(student.recentGrade)}>{student.recentGrade}</Badge>
                      <Badge className={getAttendanceColor(student.recentAttendance)}>{student.recentAttendance}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Class Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Class Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={classPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgGrade" fill="#4CAF50" name="Average Grade" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>My Schedule Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">08:00 AM - 08:45 AM</p>
                    <p className="text-sm text-gray-600">Advanced Mathematics (12A) - Room 301</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">10:30 AM - 11:15 AM</p>
                    <p className="text-sm text-gray-600">Applied Physics (11B) - Lab 2</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">02:00 PM - 02:45 PM</p>
                    <p className="text-sm text-gray-600">Organic Chemistry (10A) - Lab 1</p>
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:bg-blue-50">
                View Full Timetable <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Recent Announcements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Faculty Meeting Reminder</p>
                  <p className="text-xs text-blue-600">Tomorrow at 3:00 PM in the Staff Room.</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">New Grading Policy Update</p>
                  <p className="text-xs text-green-600">Please review the updated grading guidelines.</p>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:bg-blue-50">
                View All Announcements <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Student Performance Snapshot */}
          <Card>
            <CardHeader>
              <CardTitle>Student Performance Snapshot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">High Achievers</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">12</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">At Risk Students</span>
                  </div>
                  <Badge className="bg-red-100 text-red-800 border-red-200">5</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Award Nominations</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200">3</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
