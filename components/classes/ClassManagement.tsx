"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, Plus, Edit, Trash2, Users, GraduationCap, CalendarDays, Eye } from "lucide-react"

interface Class {
  id: number
  classId: string
  name: string
  gradeLevel: string
  assignedTeacher: string
  studentCount: number
  capacity: number
  status: "Active" | "Full" | "Archived"
  schedule: string // e.g., "Mon, Wed, Fri"
}

const mockClasses: Class[] = [
  {
    id: 1,
    classId: "CLS10A",
    name: "Grade 10A - Mathematics & Sciences",
    gradeLevel: "Grade 10",
    assignedTeacher: "Mrs. Sibongile Mthembu",
    studentCount: 32,
    capacity: 35,
    status: "Active",
    schedule: "Mon, Wed, Fri",
  },
  {
    id: 2,
    classId: "CLS10B",
    name: "Grade 10B - Commerce Stream",
    gradeLevel: "Grade 10",
    assignedTeacher: "Mr. Thabo Molefe",
    studentCount: 28,
    capacity: 35,
    status: "Active",
    schedule: "Tue, Thu",
  },
  {
    id: 3,
    classId: "CLS11A",
    name: "Grade 11A - Physical Sciences",
    gradeLevel: "Grade 11",
    assignedTeacher: "Dr. Zanele Dlamini",
    studentCount: 35,
    capacity: 35,
    status: "Full",
    schedule: "Mon, Tue, Wed, Thu, Fri",
  },
  {
    id: 4,
    classId: "CLS09A",
    name: "Grade 9A - General Education",
    gradeLevel: "Grade 9",
    assignedTeacher: "Ms. Nomsa Nkomo",
    studentCount: 30,
    capacity: 35,
    status: "Active",
    schedule: "Mon, Wed, Fri",
  },
]

export default function ClassManagement() {
  const [classes, setClasses] = useState<Class[]>(mockClasses)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<Class | null>(null)

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.classId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.assignedTeacher.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = selectedGrade === "all" || cls.gradeLevel === selectedGrade
    const matchesStatus = selectedStatus === "all" || cls.status === selectedStatus

    return matchesSearch && matchesGrade && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200"
      case "Full":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Archived":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleAddClass = (classData: Partial<Class>) => {
    const newClass: Class = {
      id: classes.length + 1,
      classId: `CLS${String(classes.length + 1).padStart(3, "0")}`,
      name: classData.name || "",
      gradeLevel: classData.gradeLevel || "",
      assignedTeacher: classData.assignedTeacher || "",
      studentCount: classData.studentCount || 0,
      capacity: classData.capacity || 35,
      status: "Active",
      schedule: classData.schedule || "",
    }
    setClasses([...classes, newClass])
    setIsAddDialogOpen(false)
  }

  const handleEditClass = (updatedClass: Class) => {
    setClasses(classes.map((cls) => (cls.id === updatedClass.id ? updatedClass : cls)))
    setEditingClass(null)
    setIsAddDialogOpen(false)
  }

  const handleDeleteClass = (id: number) => {
    setClasses(classes.filter((cls) => cls.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Management</h1>
          <p className="text-gray-600">Organise and manage academic classes</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <CalendarDays className="w-4 h-4 mr-2" />
            Generate Timetable
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setEditingClass(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingClass ? "Edit Class" : "Add New Class"}</DialogTitle>
                <DialogDescription>
                  {editingClass ? "Update the class information." : "Enter the class details to create a new record."}
                </DialogDescription>
              </DialogHeader>
              <ClassForm
                initialData={editingClass}
                onSubmit={editingClass ? handleEditClass : handleAddClass}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">{classes.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Classes</p>
                <p className="text-2xl font-bold text-green-600">
                  {classes.filter((c) => c.status === "Active").length}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Learners</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(classes.reduce((sum, c) => sum + c.studentCount, 0) / classes.length).toFixed(1)}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Educators Assigned</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(classes.map((c) => c.assignedTeacher)).size}
                </p>
              </div>
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search classes by name, ID, or educator..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="Grade 8">Grade 8</SelectItem>
                  <SelectItem value="Grade 9">Grade 9</SelectItem>
                  <SelectItem value="Grade 10">Grade 10</SelectItem>
                  <SelectItem value="Grade 11">Grade 11</SelectItem>
                  <SelectItem value="Grade 12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Full">Full</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Classes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Classes ({filteredClasses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500 border-b">
                  <th className="pb-3">Class Name</th>
                  <th className="pb-3">Class ID</th>
                  <th className="pb-3">Grade Level</th>
                  <th className="pb-3">Assigned Educator</th>
                  <th className="pb-3">Learners</th>
                  <th className="pb-3">Schedule</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredClasses.map((cls) => (
                  <tr key={cls.id} className="border-b border-gray-100">
                    <td className="py-4">
                      <p className="font-medium text-gray-900">{cls.name}</p>
                    </td>
                    <td className="py-4 font-mono text-gray-600">{cls.classId}</td>
                    <td className="py-4 text-gray-600">{cls.gradeLevel}</td>
                    <td className="py-4 font-medium text-gray-900">{cls.assignedTeacher}</td>
                    <td className="py-4 text-gray-600">
                      {cls.studentCount} / {cls.capacity}
                    </td>
                    <td className="py-4 text-gray-600">{cls.schedule}</td>
                    <td className="py-4">
                      <Badge className={getStatusColor(cls.status)}>{cls.status}</Badge>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingClass(cls)
                            setIsAddDialogOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteClass(cls.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ClassForm({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData?: Partial<Class> | null
  onSubmit: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<Class>>(
    initialData || {
      name: "",
      gradeLevel: "",
      assignedTeacher: "",
      studentCount: 0,
      capacity: 35,
      status: "Active",
      schedule: "",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Class Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gradeLevel">Grade Level</Label>
          <Select
            value={formData.gradeLevel}
            onValueChange={(value) => setFormData({ ...formData, gradeLevel: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Grade Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Grade 8">Grade 8</SelectItem>
              <SelectItem value="Grade 9">Grade 9</SelectItem>
              <SelectItem value="Grade 10">Grade 10</SelectItem>
              <SelectItem value="Grade 11">Grade 11</SelectItem>
              <SelectItem value="Grade 12">Grade 12</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="assignedTeacher">Assigned Educator</Label>
          <Input
            id="assignedTeacher"
            value={formData.assignedTeacher}
            onChange={(e) => setFormData({ ...formData, assignedTeacher: e.target.value })}
            placeholder="e.g., Mrs. Sibongile Mthembu"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="studentCount">Current Learners</Label>
          <Input
            id="studentCount"
            type="number"
            value={formData.studentCount}
            onChange={(e) => setFormData({ ...formData, studentCount: Number.parseInt(e.target.value) || 0 })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) || 0 })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="schedule">Schedule (e.g., Mon, Wed, Fri)</Label>
        <Input
          id="schedule"
          value={formData.schedule}
          onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
          placeholder="e.g., Mon, Wed, Fri"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value as "Active" | "Full" | "Archived" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Full">Full</SelectItem>
            <SelectItem value="Archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {initialData ? "Save Changes" : "Add Class"}
        </Button>
      </div>
    </form>
  )
}
