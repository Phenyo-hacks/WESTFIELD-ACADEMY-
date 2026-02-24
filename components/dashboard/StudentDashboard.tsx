'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Calendar, Clock, GraduationCap, TrendingUp, Users, Bell, FileText } from 'lucide-react'
import AnnouncementBoard from '@/components/announcements/AnnouncementBoard'

export default function StudentDashboard() {
  const upcomingClasses = [
    { subject: 'Mathematics', time: '09:00 AM', room: 'Room 101', teacher: 'Ms. Johnson' },
    { subject: 'Physics', time: '10:30 AM', room: 'Lab 201', teacher: 'Mr. Smith' },
    { subject: 'English', time: '02:00 PM', room: 'Room 105', teacher: 'Mrs. Brown' },
  ]

  const recentGrades = [
    { subject: 'Mathematics', grade: 'A', percentage: 92, date: '2024-01-15' },
    { subject: 'Physics', grade: 'B+', percentage: 87, date: '2024-01-12' },
    { subject: 'Chemistry', grade: 'A-', percentage: 89, date: '2024-01-10' },
  ]

  const assignments = [
    { title: 'Math Assignment 3', subject: 'Mathematics', dueDate: '2024-01-20', status: 'pending' },
    { title: 'Physics Lab Report', subject: 'Physics', dueDate: '2024-01-18', status: 'submitted' },
    { title: 'English Essay', subject: 'English', dueDate: '2024-01-25', status: 'pending' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
            <p className="text-blue-100">Ready to continue your learning journey?</p>
          </div>
          <div className="hidden md:block">
            <img 
              src="/images/student-group.jpg" 
              alt="Students studying" 
              className="w-32 h-24 object-cover rounded-lg opacity-90"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall GPA</p>
                <p className="text-2xl font-bold text-green-600">3.8</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Attendance</p>
                <p className="text-2xl font-bold text-blue-600">94%</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assignments</p>
                <p className="text-2xl font-bold text-orange-600">3</p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Notifications</p>
                <p className="text-2xl font-bold text-red-600">5</p>
              </div>
              <Bell className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((class_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="font-medium">{class_.subject}</p>
                      <p className="text-sm text-gray-600">{class_.teacher} • {class_.room}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {class_.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Recent Grades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentGrades.map((grade, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{grade.subject}</p>
                    <p className="text-sm text-gray-600">{grade.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={grade.grade.startsWith('A') ? 'default' : 'secondary'}>
                      {grade.grade}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{grade.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Assignments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{assignment.title}</p>
                  <p className="text-sm text-gray-600">{assignment.subject}</p>
                </div>
                <div className="text-right">
                  <Badge variant={assignment.status === 'submitted' ? 'default' : 'destructive'}>
                    {assignment.status}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">Due: {assignment.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Announcements Section */}
      <AnnouncementBoard userRole="STUDENT" />
    </div>
  )
}
