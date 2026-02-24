"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, ChevronRight, DollarSign, CheckCircle, Award } from "lucide-react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

// Mock data for a parent's view
const mockChildData = {
  name: "Sarah Mitchell",
  grade: "Grade 10",
  class: "10A",
  gpa: 3.85,
  attendanceRate: 96.5,
  upcomingAssignments: 4,
  feesDue: 250,
  attendanceBreakdown: [
    { name: "Present", value: 90 },
    { name: "Absent", value: 5 },
    { name: "Late", value: 5 },
  ],
  recentGrades: [
    { subject: "Mathematics", assignment: "Algebra II Quiz", score: 92, grade: "A" },
    { subject: "Physics", assignment: "Lab Report 1", score: 85, grade: "B" },
    { subject: "English", assignment: "Essay Draft", score: "Pending", grade: "N/A" },
  ],
  upcomingSchedule: [
    { time: "08:00 AM - 08:45 AM", details: "Advanced Mathematics - Room 301" },
    { time: "10:30 AM - 11:15 AM", details: "Applied Physics - Lab 2" },
    { time: "02:00 PM - 02:45 PM", details: "Organic Chemistry - Lab 1" },
  ],
  recentAnnouncements: [
    { title: "School Holiday on May 27th", details: "No classes due to Memorial Day." },
    { title: "Annual Sports Day Registration Open", details: "Sign up by May 30th!" },
  ],
}

const COLORS = ["#4CAF50", "#F44336", "#FFC107"] // Green, Red, Amber for Present, Absent, Late

export default function ParentDashboard() {
  const parentName = "Mr. Robert Mitchell" // Mock parent name

  const getGradeColor = (gradeLetter: string) => {
    switch (gradeLetter) {
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

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {parentName}!</h1>
        <p className="text-gray-600 mt-1">Overview for {mockChildData.name}.</p>
      </div>

      {/* Child's Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Child's GPA</p>
                <p className="text-3xl font-bold text-gray-900">{mockChildData.gpa}</p>
              </div>
              <Award className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-3xl font-bold text-green-600">{mockChildData.attendanceRate}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Assignments</p>
                <p className="text-3xl font-bold text-orange-600">{mockChildData.upcomingAssignments}</p>
              </div>
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fees Due</p>
                <p className="text-3xl font-bold text-red-600">${mockChildData.feesDue}</p>
              </div>
              <DollarSign className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Child's Classes Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {mockChildData.name}'s Current Classes
                <Button variant="ghost" size="sm">
                  View Full Schedule <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mock Class 1 */}
                <Card className="relative overflow-hidden">
                  <div
                    className="h-24 bg-gradient-to-br from-purple-600 to-purple-800 bg-cover bg-center"
                    style={{
                      backgroundImage: "url('/placeholder.svg?height=96&width=200')",
                    }}
                  >
                    <div className="absolute inset-0 bg-purple-900 bg-opacity-60"></div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Advanced Mathematics</h3>
                    <p className="text-sm text-gray-600 mb-2">MATH401 2024 FT • Dr. Johnson</p>
                    <p className="text-xs text-blue-600">Next: Monday, 8:00 AM • Room 301</p>
                  </CardContent>
                </Card>
                {/* Mock Class 2 */}
                <Card className="relative overflow-hidden">
                  <div
                    className="h-24 bg-gradient-to-br from-blue-600 to-blue-800 bg-cover bg-center"
                    style={{
                      backgroundImage: "url('/placeholder.svg?height=96&width=200')",
                    }}
                  >
                    <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Applied Physics</h3>
                    <p className="text-sm text-gray-600 mb-2">PHYS301 2024 FT • Prof. Wilson</p>
                    <p className="text-xs text-blue-600">Next: Tuesday, 10:30 AM • Lab 2</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Recent Grades */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Grades for {mockChildData.name}
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockChildData.recentGrades.map((grade, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border ${getGradeColor(grade.grade)}`}
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {grade.subject} - {grade.assignment}
                      </p>
                      <p className="text-xs text-gray-600">
                        Score: {grade.score}
                        {grade.score !== "Pending" && "%"}
                      </p>
                    </div>
                    <Badge className={getGradeColor(grade.grade)}>{grade.grade}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>{mockChildData.name}'s Schedule Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockChildData.upcomingSchedule.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">{item.time}</p>
                      <p className="text-sm text-gray-600">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:bg-blue-50">
                View Full Schedule <ChevronRight className="w-4 h-4 ml-2" />
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
                {mockChildData.recentAnnouncements.map((announcement, index) => (
                  <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">{announcement.title}</p>
                    <p className="text-xs text-blue-600">{announcement.details}</p>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:bg-blue-50">
                View All Announcements <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Fee Status */}
          <Card>
            <CardHeader>
              <CardTitle>Fee Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">Tuition Fee (May)</span>
                  </div>
                  <Badge className="bg-red-100 text-red-700 border-red-200">${mockChildData.feesDue} Due</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Library Fine</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">Paid</Badge>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:bg-blue-50">
                Make Payment <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Child's Attendance Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>{mockChildData.name}'s Attendance Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={mockChildData.attendanceBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockChildData.attendanceBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
