import { NextResponse } from "next/server"

// Mock South African student data
const mockStudents = [
  {
    id: 1,
    studentId: "STU2024001",
    name: "Thabo Mthembu",
    email: "thabo.mthembu@student.westfield.edu",
    phone: "082 123 4567",
    grade: "Grade 10",
    class: "10A",
    status: "Active",
    admissionDate: "2024-01-15",
    guardianName: "Nomsa Mthembu",
    guardianPhone: "083 234 5678",
    address: "123 Mandela Street, Soweto, Johannesburg, 1809",
  },
  {
    id: 2,
    studentId: "STU2024002",
    name: "Nomsa Dlamini",
    email: "nomsa.dlamini@student.westfield.edu",
    phone: "084 234 5678",
    grade: "Grade 9",
    class: "9B",
    status: "Active",
    admissionDate: "2024-01-20",
    guardianName: "Sipho Dlamini",
    guardianPhone: "082 345 6789",
    address: "456 Biko Avenue, Katlehong, Ekurhuleni, 1431",
  },
  {
    id: 3,
    studentId: "STU2024003",
    name: "Sipho Ndlovu",
    email: "sipho.ndlovu@student.westfield.edu",
    phone: "083 345 6789",
    grade: "Grade 11",
    class: "11C",
    status: "Active",
    admissionDate: "2024-02-01",
    guardianName: "Zanele Ndlovu",
    guardianPhone: "084 456 7890",
    address: "789 Luthuli Road, Umlazi, Durban, 4031",
  },
  {
    id: 4,
    studentId: "STU2024004",
    name: "Lerato Mokoena",
    email: "lerato.mokoena@student.westfield.edu",
    phone: "082 456 7890",
    grade: "Grade 12",
    class: "12A",
    status: "Active",
    admissionDate: "2023-09-01",
    guardianName: "Pule Mokoena",
    guardianPhone: "083 567 8901",
    address: "321 Tambo Street, Mamelodi, Pretoria, 0122",
  },
]

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return NextResponse.json(mockStudents)
}

export async function POST(request: Request) {
  const newStudent = await request.json()
  // In a real app, you'd save this to a database and assign a real ID
  const studentWithId = {
    ...newStudent,
    id: mockStudents.length + 1,
    studentId: `STU2024${String(mockStudents.length + 1).padStart(3, "0")}`,
  }
  mockStudents.push(studentWithId) // Add to mock data for demonstration
  return NextResponse.json(studentWithId, { status: 201 })
}
