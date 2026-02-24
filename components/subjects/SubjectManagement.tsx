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
import { BookOpen, Search, Plus, Edit, Trash2, Users, GraduationCap, ClipboardList, Eye } from "lucide-react"
import { Download } from "lucide-react" // Import Download component

interface Subject {
  id: number
  subjectId: string
  name: string
  code: string
  department: string
  teacherCount: number
  classCount: number
  status: "Active" | "Inactive"
}

const mockSubjects: Subject[] = [
  {
    id: 1,
    subjectId: "SUB001",
    name: "Mathematics",
    code: "MATH101",
    department: "Mathematics",
    teacherCount: 5,
    classCount: 12,
    status: "Active",
  },
  {
    id: 2,
    subjectId: "SUB002",
    name: "Physics",
    code: "PHYS201",
    department: "Science",
    teacherCount: 3,
    classCount: 8,
    status: "Active",
  },
  {
    id: 3,
    subjectId: "SUB003",
    name: "English Literature",
    code: "ENG301",
    department: "English",
    teacherCount: 4,
    classCount: 10,
    status: "Active",
  },
  {
    id: 4,
    subjectId: "SUB004",
    name: "History",
    code: "HIST401",
    department: "Humanities",
    teacherCount: 2,
    classCount: 6,
    status: "Active",
  },
  {
    id: 5,
    subjectId: "SUB005",
    name: "Computer Science",
    code: "CS501",
    department: "Technology",
    teacherCount: 3,
    classCount: 7,
    status: "Active",
  },
  {
    id: 6,
    subjectId: "SUB006",
    name: "Art & Design",
    code: "ART601",
    department: "Arts",
    teacherCount: 1,
    classCount: 3,
    status: "Inactive",
  },
]

export default function SubjectManagement() {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null)

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || subject.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || subject.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200"
      case "Inactive":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleAddSubject = (subjectData: Partial<Subject>) => {
    const newSubject: Subject = {
      id: subjects.length + 1,
      subjectId: `SUB${String(subjects.length + 1).padStart(3, "0")}`,
      name: subjectData.name || "",
      code: subjectData.code || "",
      department: subjectData.department || "",
      teacherCount: subjectData.teacherCount || 0,
      classCount: subjectData.classCount || 0,
      status: "Active",
    }
    setSubjects([...subjects, newSubject])
    setIsAddDialogOpen(false)
  }

  const handleEditSubject = (updatedSubject: Subject) => {
    setSubjects(subjects.map((s) => (s.id === updatedSubject.id ? updatedSubject : s)))
    setEditingSubject(null)
    setIsAddDialogOpen(false)
  }

  const handleDeleteSubject = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subject Management</h1>
          <p className="text-gray-600">Manage academic subjects offered at the academy</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setEditingSubject(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Subject
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingSubject ? "Edit Subject" : "Add New Subject"}</DialogTitle>
                <DialogDescription>
                  {editingSubject
                    ? "Update the subject's information."
                    : "Enter the subject details to create a new record."}
                </DialogDescription>
              </DialogHeader>
              <SubjectForm
                initialData={editingSubject}
                onSubmit={editingSubject ? handleEditSubject : handleAddSubject}
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
                <p className="text-sm font-medium text-gray-600">Total Subjects</p>
                <p className="text-2xl font-bold text-gray-900">{subjects.length}</p>
              </div>
              <ClipboardList className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subjects</p>
                <p className="text-2xl font-bold text-green-600">
                  {subjects.filter((s) => s.status === "Active").length}
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
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-blue-600">{new Set(subjects.map((s) => s.department)).size}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Classes per Subject</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(subjects.reduce((sum, s) => sum + s.classCount, 0) / subjects.length).toFixed(1)}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
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
                  placeholder="Search subjects by name, code, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Humanities">Humanities</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subjects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Subjects ({filteredSubjects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500 border-b">
                  <th className="pb-3">Subject Name</th>
                  <th className="pb-3">Code</th>
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Teachers</th>
                  <th className="pb-3">Classes</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredSubjects.map((subject) => (
                  <tr key={subject.id} className="border-b border-gray-100">
                    <td className="py-4">
                      <p className="font-medium text-gray-900">{subject.name}</p>
                    </td>
                    <td className="py-4 font-mono text-gray-600">{subject.code}</td>
                    <td className="py-4 text-gray-600">{subject.department}</td>
                    <td className="py-4 text-gray-600">{subject.teacherCount}</td>
                    <td className="py-4 text-gray-600">{subject.classCount}</td>
                    <td className="py-4">
                      <Badge className={getStatusColor(subject.status)}>{subject.status}</Badge>
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
                            setEditingSubject(subject)
                            setIsAddDialogOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteSubject(subject.id)}
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

function SubjectForm({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData?: Partial<Subject> | null
  onSubmit: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<Subject>>(
    initialData || {
      name: "",
      code: "",
      department: "",
      teacherCount: 0,
      classCount: 0,
      status: "Active",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Subject Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">Subject Code</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            placeholder="e.g., MATH101"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="Science">Science</SelectItem>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Humanities">Humanities</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Arts">Arts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="teacherCount">Assigned Teachers</Label>
          <Input
            id="teacherCount"
            type="number"
            value={formData.teacherCount}
            onChange={(e) => setFormData({ ...formData, teacherCount: Number.parseInt(e.target.value) || 0 })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="classCount">Associated Classes</Label>
          <Input
            id="classCount"
            type="number"
            value={formData.classCount}
            onChange={(e) => setFormData({ ...formData, classCount: Number.parseInt(e.target.value) || 0 })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value as "Active" | "Inactive" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {initialData ? "Save Changes" : "Add Subject"}
        </Button>
      </div>
    </form>
  )
}
