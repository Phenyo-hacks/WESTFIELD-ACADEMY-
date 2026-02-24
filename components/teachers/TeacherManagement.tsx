"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { GraduationCap, Search, Plus, Edit, Trash2, Eye, Download, UserCheck, BookOpen } from "lucide-react"

interface Teacher {
  id: number
  teacherId: string
  name: string
  email: string
  phone: string
  department: string
  status: "Active" | "On Leave" | "Retired"
  hireDate: string
  qualifications: string
  address: string
}

const mockTeachers: Teacher[] = [
  {
    id: 1,
    teacherId: "TCH2024001",
    name: "Mrs. Sibongile Mthembu",
    email: "s.mthembu@westfield.edu",
    phone: "082 111 2222",
    department: "Mathematics",
    status: "Active",
    hireDate: "2018-01-15",
    qualifications: "B.Ed Mathematics, Honours",
    address: "45 Vilakazi Street, Orlando West, Soweto, 1804",
  },
  {
    id: 2,
    teacherId: "TCH2024002",
    name: "Mr. Thabo Molefe",
    email: "t.molefe@westfield.edu",
    phone: "083 333 4444",
    department: "Physical Sciences",
    status: "Active",
    hireDate: "2019-02-01",
    qualifications: "B.Sc Physics, PGCE",
    address: "12 Biko Avenue, Mamelodi, Pretoria, 0122",
  },
  {
    id: 3,
    teacherId: "TCH2024003",
    name: "Ms. Nomsa Nkomo",
    email: "n.nkomo@westfield.edu",
    phone: "084 555 6666",
    department: "English",
    status: "On Leave",
    hireDate: "2015-07-10",
    qualifications: "B.A English Literature, PGCE",
    address: "78 Mandela Drive, Katlehong, Ekurhuleni, 1431",
  },
  {
    id: 4,
    teacherId: "TCH2024004",
    name: "Dr. Zanele Dlamini",
    email: "z.dlamini@westfield.edu",
    phone: "082 777 8888",
    department: "Life Sciences",
    status: "Active",
    hireDate: "2020-01-20",
    qualifications: "Ph.D Biology, B.Ed Life Sciences",
    address: "23 Luthuli Road, Umlazi, Durban, 4031",
  },
]

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || teacher.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || teacher.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200"
      case "On Leave":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Retired":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleAddTeacher = (teacherData: Partial<Teacher>) => {
    const newTeacher: Teacher = {
      id: teachers.length + 1,
      teacherId: `TCH2024${String(teachers.length + 1).padStart(3, "0")}`,
      name: teacherData.name || "",
      email: teacherData.email || "",
      phone: teacherData.phone || "",
      department: teacherData.department || "",
      status: "Active",
      hireDate: new Date().toISOString().split("T")[0],
      qualifications: teacherData.qualifications || "",
      address: teacherData.address || "",
    }
    setTeachers([...teachers, newTeacher])
    setIsAddDialogOpen(false)
  }

  const handleEditTeacher = (updatedTeacher: Teacher) => {
    setTeachers(teachers.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t)))
    setEditingTeacher(null)
    setIsAddDialogOpen(false)
  }

  const handleDeleteTeacher = (id: number) => {
    setTeachers(teachers.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Educator Management</h1>
          <p className="text-gray-600">Manage teaching staff records and information</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setEditingTeacher(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Educator
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingTeacher ? "Edit Educator" : "Add New Educator"}</DialogTitle>
                <DialogDescription>
                  {editingTeacher
                    ? "Update the educator's information."
                    : "Enter the educator's information to create a new record."}
                </DialogDescription>
              </DialogHeader>
              <TeacherForm
                initialData={editingTeacher}
                onSubmit={editingTeacher ? handleEditTeacher : handleAddTeacher}
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
                <p className="text-sm font-medium text-gray-600">Total Educators</p>
                <p className="text-2xl font-bold text-gray-900">{teachers.length}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Educators</p>
                <p className="text-2xl font-bold text-green-600">
                  {teachers.filter((t) => t.status === "Active").length}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-blue-600">{new Set(teachers.map((t) => t.department)).size}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Tenure</p>
                <p className="text-2xl font-bold text-purple-600">4.8 Years</p>
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
                  placeholder="Search educators by name, ID, or email..."
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
                  <SelectItem value="Physical Sciences">Physical Sciences</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Life Sciences">Life Sciences</SelectItem>
                  <SelectItem value="Afrikaans">Afrikaans</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Retired">Retired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Educators ({filteredTeachers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500 border-b">
                  <th className="pb-3">Educator</th>
                  <th className="pb-3">Educator ID</th>
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Hire Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b border-gray-100">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-purple-100 text-purple-600">
                            {teacher.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{teacher.name}</p>
                          <p className="text-gray-500">{teacher.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-mono text-gray-600">{teacher.teacherId}</td>
                    <td className="py-4">
                      <p className="font-medium">{teacher.department}</p>
                      <p className="text-gray-500">{teacher.qualifications}</p>
                    </td>
                    <td className="py-4 text-gray-600">{teacher.phone}</td>
                    <td className="py-4 text-gray-600">{teacher.hireDate}</td>
                    <td className="py-4">
                      <Badge className={getStatusColor(teacher.status)}>{teacher.status}</Badge>
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
                            setEditingTeacher(teacher)
                            setIsAddDialogOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteTeacher(teacher.id)}
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

function TeacherForm({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData?: Partial<Teacher> | null
  onSubmit: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<Teacher>>(
    initialData || {
      name: "",
      email: "",
      phone: "",
      department: "",
      qualifications: "",
      address: "",
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
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Mrs. Sibongile Mthembu"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="082 123 4567"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select
            value={formData.department}
            onValueChange={(value) => setFormData({ ...formData, department: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Physical Sciences">Physical Sciences</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Life Sciences">Life Sciences</SelectItem>
              <SelectItem value="Afrikaans">Afrikaans</SelectItem>
              <SelectItem value="History">History</SelectItem>
              <SelectItem value="Geography">Geography</SelectItem>
              <SelectItem value="Arts & Culture">Arts & Culture</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="qualifications">Qualifications</Label>
        <Input
          id="qualifications"
          value={formData.qualifications}
          onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
          placeholder="e.g., B.Ed Mathematics, Honours"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value as "Active" | "On Leave" | "Retired" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="On Leave">On Leave</SelectItem>
            <SelectItem value="Retired">Retired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {initialData ? "Save Changes" : "Add Educator"}
        </Button>
      </div>
    </form>
  )
}
