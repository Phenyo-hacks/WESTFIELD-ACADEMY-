"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Calendar, BookOpen, Award, UserCheck, DollarSign, ChevronRight } from "lucide-react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

interface Student {
  id: number
  studentId: string
  name: string
  email: string
  phone: string
  grade: string
  class: string
  status: "Active" | "Inactive" | "Suspended"
  admissionDate: string
  guardianName: string
  guardianPhone: string
  address: string
  dateOfBirth: string
  gender: string
  gpa: number
  attendanceRate: number
  recentGrades: { subject: string; assignment: string; score: number; maxScore: number; grade: string }[]
  attendanceBreakdown: { name: string; value: number }[]
  fees: { feeType: string; amount: number; dueDate: string; status: "Paid" | "Pending" | "Overdue" }[]
}

const COLORS = ["#4CAF50", "#F44336", "#FFC107"] // Green, Red, Amber for Present, Absent, Late

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

const getFeeStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700 border-green-200"
    case "Pending":
      return "bg-blue-100 text-blue-700 border-blue-200"
    case "Overdue":
      return "bg-red-100 text-red-700 border-red-200"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200"
  }
}

export default function StudentProfile({ student }: { student: Student }) {
  if (!student) {
    return <div className="text-center text-gray-600">Student not found.</div>
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-blue-500">
            <AvatarFallback className="text-4xl md:text-6xl bg-blue-100 text-blue-600">
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
            <p className="text-lg text-gray-600">
              {student.grade} - Class {student.class} ({student.studentId})
            </p>
            <Badge className={`mt-2 ${getFeeStatusColor(student.status)}`}>{student.status}</Badge>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{student.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>DOB: {student.dateOfBirth}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:self-start">
            <Button variant="outline">Edit Profile</Button>
            <Button variant="destructive">Delete Student</Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current GPA</p>
                <p className="text-3xl font-bold text-gray-900">{student.gpa.toFixed(2)}</p>
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
                <p className="text-3xl font-bold text-green-600">{student.attendanceRate}%</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Assignments</p>
                <p className="text-3xl font-bold text-orange-600">
                  {student.recentGrades.filter((g) => g.grade === "N/A").length}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fees Due</p>
                <p className="text-3xl font-bold text-red-600">
                  ${student.fees.filter((f) => f.status !== "Paid").reduce((sum, f) => sum + f.amount, 0)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Academic & Attendance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Grades
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {student.recentGrades.map((grade, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${getGradeColor(grade.grade)}`}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {grade.subject} - {grade.assignment}
                    </p>
                    <p className="text-xs text-gray-600">
                      Score: {grade.score} / {grade.maxScore}
                    </p>
                  </div>
                  <Badge className={getGradeColor(grade.grade)}>{grade.grade}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={student.attendanceBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {student.attendanceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Fee Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Fee Information
            <Button variant="ghost" size="sm">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {student.fees.map((fee, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${getFeeStatusColor(fee.status)}`}
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{fee.feeType}</p>
                  <p className="text-xs text-gray-600">Due: {fee.dueDate}</p>
                </div>
                <Badge className={getFeeStatusColor(fee.status)}>
                  ${fee.amount} {fee.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
