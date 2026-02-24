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
import { FileText, Search, Plus, Edit, Trash2, Users, BookOpen, Award, Download } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext" // Import useAuth

interface Grade {
  id: number
  studentId: string
  studentName: string
  subject: string
  assignment: string
  score: number
  maxScore: number
  grade: string // A, B, C, D, F
  date: string
  teacher: string
}

const mockGrades: Grade[] = [
  {
    id: 1,
    studentId: "STU2024001",
    studentName: "John Davidson",
    subject: "Mathematics",
    assignment: "Algebra II Quiz",
    score: 92,
    maxScore: 100,
    grade: "A",
    date: "2025-05-18",
    teacher: "Ms. Emily Davis",
  },
  {
    id: 2,
    studentId: "STU2024002",
    studentName: "Sarah Mitchell",
    subject: "Physics",
    assignment: "Lab Report 1",
    score: 85,
    maxScore: 100,
    grade: "B",
    date: "2025-05-15",
    teacher: "Dr. Robert Johnson", // Assigned to mock teacher
  },
  {
    id: 3,
    studentId: "STU2024003",
    studentName: "Michael Johnson",
    subject: "English",
    assignment: "Essay Draft",
    score: 78,
    maxScore: 100,
    grade: "C",
    date: "2025-05-10",
    teacher: "Mr. David Brown",
  },
  {
    id: 4,
    studentId: "STU2024004",
    studentName: "Emily Davis",
    subject: "History",
    assignment: "Midterm Exam",
    score: 95,
    maxScore: 100,
    grade: "A",
    date: "2025-05-20",
    teacher: "Dr. Sarah Wilson",
  },
  {
    id: 5,
    studentId: "STU2024001",
    studentName: "John Davidson",
    subject: "Chemistry",
    assignment: "Unit 3 Test",
    score: 70,
    maxScore: 100,
    grade: "C",
    date: "2025-05-22",
    teacher: "Dr. Smith",
  },
  {
    id: 6,
    studentId: "STU2024002",
    studentName: "Sarah Mitchell",
    subject: "Mathematics",
    assignment: "Final Exam",
    score: 90,
    maxScore: 100,
    grade: "A",
    date: "2025-06-01",
    teacher: "Dr. Robert Johnson", // Assigned to mock teacher
  },
]

export default function GradeManagement() {
  const { user } = useAuth() // Get current user
  const [grades, setGrades] = useState<Grade[]>(mockGrades)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedGradeLetter, setSelectedGradeLetter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null)

  const filteredGrades = grades.filter((grade) => {
    const matchesSearch =
      grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.assignment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "all" || grade.subject === selectedSubject
    const matchesGradeLetter = selectedGradeLetter === "all" || grade.grade === selectedGradeLetter

    // Filter by teacher if the user is a teacher
    const matchesTeacher = user?.role === "Teacher" ? grade.teacher === user.name : true

    return matchesSearch && matchesSubject && matchesGradeLetter && matchesTeacher
  })

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

  const calculateGradeLetter = (score: number, maxScore: number): string => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return "A"
    if (percentage >= 80) return "B"
    if (percentage >= 70) return "C"
    if (percentage >= 60) return "D"
    return "F"
  }

  const handleAddGrade = (gradeData: Partial<Grade>) => {
    const newGrade: Grade = {
      id: grades.length + 1,
      studentId: gradeData.studentId || "",
      studentName: gradeData.studentName || "",
      subject: gradeData.subject || "",
      assignment: gradeData.assignment || "",
      score: gradeData.score || 0,
      maxScore: gradeData.maxScore || 100,
      grade: calculateGradeLetter(gradeData.score || 0, gradeData.maxScore || 100),
      date: new Date().toISOString().split("T")[0],
      teacher: gradeData.teacher || "",
    }
    setGrades([...grades, newGrade])
    setIsAddDialogOpen(false)
  }

  const handleEditGrade = (updatedGrade: Grade) => {
    setGrades(
      grades.map((g) =>
        g.id === updatedGrade.id
          ? { ...updatedGrade, grade: calculateGradeLetter(updatedGrade.score, updatedGrade.maxScore) }
          : g,
      ),
    )
    setEditingGrade(null)
    setIsAddDialogOpen(false)
  }

  const handleDeleteGrade = (id: number) => {
    setGrades(grades.filter((g) => g.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grade Management</h1>
          <p className="text-gray-600">Manage student academic performance and records</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          {user?.role === "Admin" || user?.role === "Teacher" ? ( // Only Admin/Teacher can add grades
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setEditingGrade(null)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Grade
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingGrade ? "Edit Grade" : "Add New Grade"}</DialogTitle>
                  <DialogDescription>
                    {editingGrade
                      ? "Update the student's grade information."
                      : "Enter the grade details to create a new record."}
                  </DialogDescription>
                </DialogHeader>
                <GradeForm
                  initialData={editingGrade}
                  onSubmit={editingGrade ? handleEditGrade : handleAddGrade}
                  onCancel={() => setIsAddDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          ) : null}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Grades Recorded</p>
                <p className="text-2xl font-bold text-gray-900">{filteredGrades.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Score (Overall)</p>
                <p className="text-2xl font-bold text-green-600">
                  {(filteredGrades.reduce((sum, g) => sum + g.score, 0) / filteredGrades.length || 0).toFixed(1)}%
                </p>
              </div>
              <Award className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Students Graded</p>
                <p className="text-2xl font-bold text-blue-600">
                  {new Set(filteredGrades.map((g) => g.studentId)).size}
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
                <p className="text-sm font-medium text-gray-600">Subjects Covered</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(filteredGrades.map((g) => g.subject)).size}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-600" />
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
                  placeholder="Search by student name, ID, or assignment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedGradeLetter} onValueChange={setSelectedGradeLetter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                  <SelectItem value="F">F</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grades Table */}
      <Card>
        <CardHeader>
          <CardTitle>Grades ({filteredGrades.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500 border-b">
                  <th className="pb-3">Student</th>
                  <th className="pb-3">Subject</th>
                  <th className="pb-3">Assignment</th>
                  <th className="pb-3">Score</th>
                  <th className="pb-3">Grade</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Teacher</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredGrades.map((grade) => (
                  <tr key={grade.id} className="border-b border-gray-100">
                    <td className="py-4">
                      <p className="font-medium text-gray-900">{grade.studentName}</p>
                      <p className="text-gray-500">{grade.studentId}</p>
                    </td>
                    <td className="py-4 text-gray-600">{grade.subject}</td>
                    <td className="py-4 text-gray-600">{grade.assignment}</td>
                    <td className="py-4 font-medium text-gray-900">
                      {grade.score} / {grade.maxScore}
                    </td>
                    <td className="py-4">
                      <Badge className={getGradeColor(grade.grade)}>{grade.grade}</Badge>
                    </td>
                    <td className="py-4 text-gray-600">{grade.date}</td>
                    <td className="py-4 text-gray-600">{grade.teacher}</td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        {user?.role === "Admin" || user?.role === "Teacher" ? ( // Only Admin/Teacher can edit/delete
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingGrade(grade)
                                setIsAddDialogOpen(true)
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteGrade(grade.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        ) : null}
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

function GradeForm({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData?: Partial<Grade> | null
  onSubmit: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<Grade>>(
    initialData || {
      studentId: "",
      studentName: "",
      subject: "",
      assignment: "",
      score: 0,
      maxScore: 100,
      teacher: "",
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
          <Label htmlFor="studentName">Student Name</Label>
          <Input
            id="studentName"
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentId">Student ID</Label>
          <Input
            id="studentId"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="History">History</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="assignment">Assignment</Label>
          <Input
            id="assignment"
            value={formData.assignment}
            onChange={(e) => setFormData({ ...formData, assignment: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="score">Score</Label>
          <Input
            id="score"
            type="number"
            value={formData.score}
            onChange={(e) => setFormData({ ...formData, score: Number.parseInt(e.target.value) || 0 })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxScore">Max Score</Label>
          <Input
            id="maxScore"
            type="number"
            value={formData.maxScore}
            onChange={(e) => setFormData({ ...formData, maxScore: Number.parseInt(e.target.value) || 0 })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="teacher">Teacher</Label>
        <Input
          id="teacher"
          value={formData.teacher}
          onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
          placeholder="e.g., Ms. Emily Davis"
          required
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {initialData ? "Save Changes" : "Add Grade"}
        </Button>
      </div>
    </form>
  )
}
