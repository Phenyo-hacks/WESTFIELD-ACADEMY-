"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import LoginForm from "@/components/auth/LoginForm"
import Sidebar from "@/components/layout/Sidebar"
import AdminDashboard from "@/components/dashboard/AdminDashboard"
import StudentManagement from "@/components/students/StudentManagement"
import AttendanceSystem from "@/components/attendance/AttendanceSystem"
import TimetableManagement from "@/components/timetable/TimetableManagement"
import TeacherDashboard from "@/components/dashboard/TeacherDashboard"
import StudentDashboard from "@/components/dashboard/StudentDashboard"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Import all necessary Lucide React icons
import { GraduationCap, Grid3X3, Mail, MessageSquare, Bell, Settings, Award, FileText, BookOpen, BarChart3, Users, HelpCircle, AlertCircle } from 'lucide-react'

// Add imports for the new components
import TeacherManagement from "@/components/teachers/TeacherManagement"
import ClassManagement from "@/components/classes/ClassManagement"
import SubjectManagement from "@/components/subjects/SubjectManagement"
import GradeManagement from "@/components/grades/GradeManagement"
import FeeManagement from "@/components/fees/FeeManagement" // New import
import StudentRegistrationForm from "@/components/students/StudentRegistrationForm"
import ParentDashboard from "@/components/dashboard/ParentDashboard"

export default function Home() {
  const { isAuthenticated, user } = useAuth()
  const [activeSection, setActiveSection] = useState("dashboard")

  if (!isAuthenticated) {
    return <LoginForm />
  }

  const renderMainContent = () => {
    // Render role-specific dashboard when 'dashboard' section is active
    if (activeSection === "dashboard") {
      switch (user?.role) {
        case "Admin":
          return <AdminDashboard />
        case "Teacher":
          return <TeacherDashboard />
        case "Student":
          return <StudentDashboard />
        case "Parent": // Render ParentDashboard for Parent role
          return <ParentDashboard />
        default:
          return <p className="text-center text-gray-600">Welcome to your dashboard!</p>
      }
    }

    // Render other sections based on role permissions
    switch (activeSection) {
      case "students":
        return user?.role === "Admin" ? <StudentManagement /> : <UnauthorizedAccess />
      case "register-student": // Add this new case
        return user?.role === "Admin" ? <StudentRegistrationForm /> : <UnauthorizedAccess />
      case "attendance":
        return user?.role === "Admin" || user?.role === "Teacher" ? <AttendanceSystem /> : <UnauthorizedAccess />
      case "timetable":
        return user?.role === "Admin" ||
          user?.role === "Teacher" ||
          user?.role === "Student" ||
          user?.role === "Parent" ? (
          <TimetableManagement />
        ) : (
          <UnauthorizedAccess />
        )
      case "teachers":
        return user?.role === "Admin" ? <TeacherManagement /> : <UnauthorizedAccess />
      case "classes":
        return user?.role === "Admin" ? <ClassManagement /> : <UnauthorizedAccess />
      case "subjects":
        return user?.role === "Admin" ? <SubjectManagement /> : <UnauthorizedAccess />
      case "grades":
        return user?.role === "Admin" || user?.role === "Teacher" ? <GradeManagement /> : <UnauthorizedAccess />
      case "fees": // New case for Fee Management
        return user?.role === "Admin" || user?.role === "Student" || user?.role === "Parent" ? (
          <FeeManagement />
        ) : (
          <UnauthorizedAccess />
        )
      case "my-child-dashboard":
        return user?.role === "Parent" ? <ParentDashboard /> : <UnauthorizedAccess />
      case "my-grades": // Student and Parent can view grades
        return user?.role === "Student" || user?.role === "Parent" ? <GradeManagement /> : <UnauthorizedAccess />
      case "my-attendance": // Student and Parent can view attendance
        return user?.role === "Student" || user?.role === "Parent" ? <AttendanceSystem /> : <UnauthorizedAccess />
      // Add other cases for different sections and their respective components/permissions
      default:
        return <p className="text-center text-gray-600">Select a section from the sidebar.</p>
    }
  }

  // This is the original header and navigation bar from the previous iteration.
  // It's kept here for consistency with the initial dashboard design,
  // but the main content area below it will now be dynamically rendered.
  const renderCommonHeaderAndNav = () => (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Westfield Academy</h1>
                <p className="text-xs text-gray-500">Excellence in Education</p>
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Grid3X3 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Mail className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600">
                <MessageSquare className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative text-gray-600">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>

              <div className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">
                    {user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user?.name}</span>
              </div>

              <Button variant="ghost" size="icon" className="text-gray-600">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar (Quick Actions) */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 py-4">
            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-blue-600">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Announcements</span>
            </Button>

            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-gray-600">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-sm font-medium">Awards</span>
            </Button>

            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-gray-600">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-sm font-medium">Quick Eval</span>
            </Button>

            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-gray-600">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-sm font-medium">Library</span>
            </Button>

            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-gray-600">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-sm font-medium">Analytics Portal</span>
            </Button>

            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-gray-600">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-sm font-medium">Student Portal</span>
            </Button>

            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-gray-600">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-sm font-medium">Help</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with School Image */}
      <div className="relative h-64 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/images/school-building.png')",
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Westfield Academy</h1>
            <p className="text-xl text-blue-100">
              {user?.role === "Admin" && "Administrative Dashboard - Academic Year 2024/2025"}
              {user?.role === "Teacher" && "Teacher Portal - Academic Year 2024/2025"}
              {user?.role === "Student" && "Student Portal - Academic Year 2024/2025"}
              {user?.role === "Parent" && "Parent Portal - Academic Year 2024/2025"}
            </p>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 ml-64">
        {/* Render common header and nav only if the active section is 'dashboard' */}
        {activeSection === "dashboard" && renderCommonHeaderAndNav()}

        {/* Main content area, dynamically rendered based on activeSection and user role */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderMainContent()}</div>

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-center">
              <p className="text-sm text-gray-500">
                Powered by <span className="font-semibold">EduTech Solutions</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

// Component for unauthorized access
function UnauthorizedAccess() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-gray-600">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
      <p className="text-lg text-center">You do not have permission to view this page.</p>
      <p className="text-sm text-center mt-2">Please contact your administrator if you believe this is an error.</p>
    </div>
  )
}
