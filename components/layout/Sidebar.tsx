"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  GraduationCap,
  Home,
  Users,
  BookOpen,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  UserCheck,
  DollarSign,
  MessageSquare,
  Bell,
  ClipboardList,
  UserPlus,
  User,
  CheckCircle,
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { user, logout } = useAuth()

  const getMenuItems = () => {
    const commonItems = [
      { id: "dashboard", label: "Dashboard", icon: Home },
      { id: "messages", label: "Messages", icon: MessageSquare },
      { id: "announcements", label: "Announcements", icon: Bell },
    ]

    switch (user?.role) {
      case "Admin":
        return [
          ...commonItems,
          { id: "students", label: "Students", icon: Users },
          { id: "register-student", label: "Register Student", icon: UserPlus },
          { id: "teachers", label: "Teachers", icon: GraduationCap },
          { id: "classes", label: "Classes", icon: BookOpen },
          { id: "subjects", label: "Subjects", icon: ClipboardList },
          { id: "timetable", label: "Timetable", icon: Calendar },
          { id: "attendance", label: "Attendance", icon: UserCheck },
          { id: "grades", label: "Grades", icon: FileText },
          { id: "fees", label: "Fees", icon: DollarSign }, // New menu item for Fees
          { id: "reports", label: "Reports", icon: BarChart3 },
          { id: "settings", label: "Settings", icon: Settings },
        ]
      case "Teacher":
        return [
          ...commonItems,
          { id: "my-classes", label: "My Classes", icon: BookOpen },
          { id: "attendance", label: "Attendance", icon: UserCheck },
          { id: "grades", label: "Grades", icon: FileText },
          { id: "timetable", label: "My Schedule", icon: Calendar },
          { id: "students", label: "My Students", icon: Users },
        ]
      case "Student":
        return [
          ...commonItems,
          { id: "my-grades", label: "My Grades", icon: FileText },
          { id: "my-attendance", label: "My Attendance", icon: UserCheck },
          { id: "timetable", label: "Class Schedule", icon: Calendar },
          { id: "fees", label: "Fee Status", icon: DollarSign }, // Students can view their fee status
        ]
      case "Parent":
        return [
          ...commonItems,
          { id: "my-child-dashboard", label: "My Child's Dashboard", icon: User },
          { id: "my-grades", label: "My Child's Grades", icon: FileText },
          { id: "my-attendance", label: "My Child's Attendance", icon: CheckCircle },
          { id: "timetable", label: "Class Schedule", icon: Calendar },
          { id: "fees", label: "Fee Status", icon: DollarSign },
        ]
      default:
        return commonItems
    }
  }

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Westfield</h1>
            <p className="text-xs text-gray-500">Academy</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {getMenuItems().map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeSection === item.id ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}
