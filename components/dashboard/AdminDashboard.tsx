'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, GraduationCap, BookOpen, TrendingUp, Calendar, Bell, UserCheck, AlertTriangle } from 'lucide-react'
import AnnouncementBoard from '@/components/announcements/AnnouncementBoard'

export default function AdminDashboard() {
  const quickStats = [
    { title: 'Total Students', value: '1,234', change: '+5.2%', icon: Users, color: 'text-blue-600' },
    { title: 'Total Teachers', value: '87', change: '+2.1%', icon: UserCheck, color: 'text-green-600' },
    { title: 'Active Classes', value: '45', change: '0%', icon: BookOpen, color: 'text-purple-600' },
    { title: 'Attendance Rate', value: '94.2%', change: '+1.8%', icon: TrendingUp, color: 'text-orange-600' },
  ]

  const recentActivities = [
    { action: 'New student enrolled', details: 'Sarah Johnson - Grade 10A', time: '2 hours ago', type: 'success' },
    { action: 'Teacher absence reported', details: 'Mr. Smith - Physics', time: '4 hours ago', type: 'warning' },
    { action: 'Fee payment received', details: 'John Doe - Monthly fee', time: '6 hours ago', type: 'success' },
    { action: 'Parent meeting scheduled', details: 'Grade 9B parents', time: '1 day ago', type: 'info' },
  ]

  const upcomingEvents = [
    { title: 'Parent-Teacher Meeting', date: '2024-02-10', time: '9:00 AM', type: 'meeting' },
    { title: 'Mid-term Examinations', date: '2024-03-15', time: 'All Day', type: 'exam' },
    { title: 'Sports Day', date: '2024-04-15', time: '8:00 AM', type: 'event' },
    { title: 'Science Fair', date: '2024-05-05', time: '10:00 AM', type: 'event' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-indigo-100">Manage your school efficiently</p>
          </div>
          <div className="hidden md:block">
            <img 
              src="/images/school-building.jpg" 
              alt="School building" 
              className="w-32 h-24 object-cover rounded-lg opacity-90"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' :
                    activity.type === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                  </div>
                  <Badge variant={
                    event.type === 'exam' ? 'destructive' :
                    event.type === 'meeting' ? 'default' : 'secondary'
                  }>
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Database Backup Scheduled</p>
                <p className="text-sm text-yellow-700">System backup will run tonight at 2:00 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Bell className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">New Feature Available</p>
                <p className="text-sm text-blue-700">Online fee payment system is now live</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Announcements Management */}
      <AnnouncementBoard userRole="ADMIN" />
    </div>
  )
}
