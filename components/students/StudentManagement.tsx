"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { PlusIcon, SearchIcon, EditIcon, TrashIcon, EyeIcon } from "lucide-react"

// Define the Student interface based on the frontend's needs
interface Student {
  id: string
  studentId: string
  name: string
  email: string
  gradeLevel: string
  contactNumber: string
  address: string
  dateOfBirth: string
  gender: string
  parentName: string
  parentContact: string
  status: string
}

// Mock South African student data
const mockStudents: Student[] = [
  {
    id: "1",
    studentId: "STU2024001",
    name: "Thabo Mthembu",
    email: "thabo.mthembu@student.westfield.edu",
    gradeLevel: "Grade 10",
    contactNumber: "082 123 4567",
    address: "123 Mandela Street, Soweto, Johannesburg, 1809",
    dateOfBirth: "2008-03-15",
    gender: "Male",
    parentName: "Nomsa Mthembu",
    parentContact: "083 234 5678",
    status: "Active",
  },
  {
    id: "2",
    studentId: "STU2024002",
    name: "Nomsa Dlamini",
    email: "nomsa.dlamini@student.westfield.edu",
    gradeLevel: "Grade 9",
    contactNumber: "084 234 5678",
    address: "456 Biko Avenue, Katlehong, Ekurhuleni, 1431",
    dateOfBirth: "2009-07-22",
    gender: "Female",
    parentName: "Sipho Dlamini",
    parentContact: "082 345 6789",
    status: "Active",
  },
  {
    id: "3",
    studentId: "STU2024003",
    name: "Sipho Ndlovu",
    email: "sipho.ndlovu@student.westfield.edu",
    gradeLevel: "Grade 11",
    contactNumber: "083 345 6789",
    address: "789 Luthuli Road, Umlazi, Durban, 4031",
    dateOfBirth: "2007-11-08",
    gender: "Male",
    parentName: "Zanele Ndlovu",
    parentContact: "084 456 7890",
    status: "Active",
  },
  {
    id: "4",
    studentId: "STU2024004",
    name: "Lerato Mokoena",
    email: "lerato.mokoena@student.westfield.edu",
    gradeLevel: "Grade 12",
    contactNumber: "082 456 7890",
    address: "321 Tambo Street, Mamelodi, Pretoria, 0122",
    dateOfBirth: "2006-05-14",
    gender: "Female",
    parentName: "Pule Mokoena",
    parentContact: "083 567 8901",
    status: "Active",
  },
]

// Map API response to frontend Student interface
const mapApiStudent = (apiStudent: any): Student => ({
  id: apiStudent.id ? String(apiStudent.id) : "",
  studentId: apiStudent.studentId || "",
  name: apiStudent.name || "",
  email: apiStudent.email || "",
  gradeLevel: apiStudent.grade || "", // API uses 'grade', UI uses 'gradeLevel'
  contactNumber: apiStudent.phone || "", // API uses 'phone', UI uses 'contactNumber'
  address: apiStudent.address || "",
  dateOfBirth: apiStudent.dateOfBirth || "",
  gender: apiStudent.gender || "",
  parentName: apiStudent.parentName || "",
  parentContact: apiStudent.parentContact || "",
  status: apiStudent.status || "",
})

// Map frontend Student interface to API request body
const mapStudentToApi = (student: Student): any => ({
  id: student.id ? Number(student.id) : undefined,
  studentId: student.studentId,
  name: student.name,
  email: student.email,
  grade: student.gradeLevel, // UI uses 'gradeLevel', API expects 'grade'
  phone: student.contactNumber, // UI uses 'contactNumber', API expects 'phone'
  address: student.address,
  dateOfBirth: student.dateOfBirth,
  gender: student.gender,
  parentName: student.parentName,
  parentContact: student.parentContact,
  status: student.status,
})

const StatsCard = ({ title, value }: { title: string; value: string | number }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
)

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStudents = async () => {
    setLoading(true)
    setError(null)
    try {
      // For now, use mock data. In production, this would fetch from API
      // const response = await fetch("/api/students")
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`)
      // }
      // const data = await response.json()
      // setStudents(data.map(mapApiStudent))
      setStudents(mockStudents)
    } catch (e: any) {
      console.error("Error fetching students:", e)
      setError(`Error fetching students: ${e.message || "Network Error"}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.gradeLevel.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddStudent = () => {
    setCurrentStudent({
      id: "",
      studentId: "",
      name: "",
      email: "",
      gradeLevel: "",
      contactNumber: "",
      address: "",
      dateOfBirth: "",
      gender: "",
      parentName: "",
      parentContact: "",
      status: "Active",
    })
    setIsAddEditModalOpen(true)
  }

  const handleEditStudent = (student: Student) => {
    setCurrentStudent(student)
    setIsAddEditModalOpen(true)
  }

  const handleDeleteStudent = (id: string) => {
    setStudentToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        // const response = await fetch(`/api/students/${studentToDelete}`, {
        //   method: "DELETE",
        // })
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`)
        // }
        setStudents(students.filter((s) => s.id !== studentToDelete))
        setIsDeleteModalOpen(false)
        setStudentToDelete(null)
      } catch (e: any) {
        console.error("Error deleting student:", e)
        setError(`Error deleting student: ${e.message || "Network Error"}`)
      }
    }
  }

  const handleSaveStudent = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!currentStudent) return

    const apiData = mapStudentToApi(currentStudent)

    try {
      // let response
      if (currentStudent.id) {
        // Update existing student
        // response = await fetch(`/api/students/${currentStudent.id}`, {
        //   method: "PUT",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(apiData),
        // })
        setStudents(students.map((s) => (s.id === currentStudent.id ? currentStudent : s)))
      } else {
        // Add new student
        // response = await fetch("/api/students", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(apiData),
        // })
        const newStudent = { ...currentStudent, id: String(students.length + 1) }
        setStudents([...students, newStudent])
      }

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`)
      // }

      // await fetchStudents() // Re-fetch all students to get the latest data
      setIsAddEditModalOpen(false)
      setCurrentStudent(null)
    } catch (e: any) {
      console.error("Error saving student:", e)
      setError(`Error saving student: ${e.message || "Network Error"}`)
    }
  }

  const totalStudents = students.length
  const activeStudents = students.filter((s) => s.status === "Active").length
  const inactiveStudents = totalStudents - activeStudents

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Learner Management</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatsCard title="Total Learners" value={totalStudents} />
        <StatsCard title="Active Learners" value={activeStudents} />
        <StatsCard title="Inactive Learners" value={inactiveStudents} />
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Search learners..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <Button onClick={handleAddStudent}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Learner
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading learners...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Grade Level</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.gradeLevel}</TableCell>
                  <TableCell>{student.contactNumber}</TableCell>
                  <TableCell>
                    <Badge variant={student.status === "Active" ? "default" : "secondary"}>{student.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/students/${student.id}`} passHref>
                        <Button variant="outline" size="icon" aria-label="View student profile">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditStudent(student)}
                        aria-label="Edit student"
                      >
                        <EditIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteStudent(student.id)}
                        aria-label="Delete student"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Student Modal */}
      <Dialog open={isAddEditModalOpen} onOpenChange={setIsAddEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentStudent?.id ? "Edit Learner" : "Add Learner"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveStudent} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="studentId" className="text-right">
                Student ID
              </Label>
              <Input
                id="studentId"
                value={currentStudent?.studentId || ""}
                onChange={(e) => setCurrentStudent((prev) => ({ ...prev!, studentId: e.target.value }))}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={currentStudent?.name || ""}
                onChange={(e) => setCurrentStudent((prev) => ({ ...prev!, name: e.target.value }))}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={currentStudent?.email || ""}
                onChange={(e) => setCurrentStudent((prev) => ({ ...prev!, email: e.target.value }))}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gradeLevel" className="text-right">
                Grade Level
              </Label>
              <Input
                id="gradeLevel"
                value={currentStudent?.gradeLevel || ""}
                onChange={(e) => setCurrentStudent((prev) => ({ ...prev!, gradeLevel: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contactNumber" className="text-right">
                Contact Number
              </Label>
              <Input
                id="contactNumber"
                value={currentStudent?.contactNumber || ""}
                onChange={(e) => setCurrentStudent((prev) => ({ ...prev!, contactNumber: e.target.value }))}
                className="col-span-3"
                placeholder="082 123 4567"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                value={currentStudent?.address || ""}
                onChange={(e) => setCurrentStudent((prev) => ({ ...prev!, address: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateOfBirth" className="text-right">
                Date of Birth
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={currentStudent?.dateOfBirth || ""}
                onChange={(e) => setCurrentStudent((prev) => ({ ...prev!, dateOfBirth: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <Input
                id="gender"
                value={currentStudent?.gender || ""}
                onChange={(e) => setCurrentStudent((prev) => ({ ...prev!, gender: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="parentName" className="text-right">
                Parent Name
              </Label>
              <Input
                id="parentName"
                value={currentStudent?.parentName || ""}
                onChange={(e) => setCurrentStudent((prev) => ({ ...prev!, parentName: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="parentContact" className="text-right">
                Parent Contact
              </Label>
              <Input
                id="parentContact"
                value={currentStudent?.parentContact || ""}
                onChange={(e) => setCurrentStudent((prev) => ({ ...prev!, parentContact: e.target.value }))}
                className="col-span-3"
                placeholder="083 234 5678"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Input
                id="status"
                value={currentStudent?.status || ""}
                onChange={(e) => setCurrentStudent((prev) => ({ ...prev!, status: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div>Are you sure you want to delete this learner record? This action cannot be undone.</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
