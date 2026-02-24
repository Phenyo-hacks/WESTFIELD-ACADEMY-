import StudentProfile from "@/components/students/StudentProfile"

// Mock student data (replace with actual API call in a real application)
const mockStudents = [
  {
    id: 1,
    studentId: "STU2024001",
    name: "John Davidson",
    email: "john.davidson@student.westfield.edu",
    phone: "+1 (555) 123-4567",
    grade: "Grade 10",
    class: "10A",
    status: "Active",
    admissionDate: "2024-01-15",
    guardianName: "Robert Davidson",
    guardianPhone: "+1 (555) 123-4568",
    address: "123 Main St, New York, NY 10001",
    dateOfBirth: "2008-03-10",
    gender: "Male",
    gpa: 3.75,
    attendanceRate: 94.5,
    recentGrades: [
      { subject: "Mathematics", assignment: "Algebra II Quiz", score: 92, maxScore: 100, grade: "A" },
      { subject: "Chemistry", assignment: "Unit 3 Test", score: 70, maxScore: 100, grade: "C" },
      { subject: "English", assignment: "Essay Draft", score: 0, maxScore: 100, grade: "N/A" }, // Pending
    ],
    attendanceBreakdown: [
      { name: "Present", value: 85 },
      { name: "Absent", value: 10 },
      { name: "Late", value: 5 },
    ],
    fees: [
      { feeType: "Tuition Fee", amount: 1500, dueDate: "2025-06-01", status: "Pending" },
      { feeType: "Exam Fee", amount: 50, dueDate: "2025-05-25", status: "Paid" },
    ],
  },
  {
    id: 2,
    studentId: "STU2024002",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@student.westfield.edu",
    phone: "+1 (555) 234-5678",
    grade: "Grade 9",
    class: "9B",
    status: "Active",
    admissionDate: "2024-01-20",
    guardianName: "Lisa Mitchell",
    guardianPhone: "+1 (555) 234-5679",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    dateOfBirth: "2009-11-22",
    gender: "Female",
    gpa: 3.92,
    attendanceRate: 98.2,
    recentGrades: [
      { subject: "Physics", assignment: "Lab Report 1", score: 85, maxScore: 100, grade: "B" },
      { subject: "Mathematics", assignment: "Final Exam", score: 90, maxScore: 100, grade: "A" },
    ],
    attendanceBreakdown: [
      { name: "Present", value: 95 },
      { name: "Absent", value: 3 },
      { name: "Late", value: 2 },
    ],
    fees: [
      { feeType: "Tuition Fee", amount: 1500, dueDate: "2025-05-01", status: "Paid" },
      { feeType: "Library Fine", amount: 25, dueDate: "2025-04-15", status: "Overdue" },
    ],
  },
]

// This is a Server Component that fetches data
export default async function StudentProfilePage({ params }: { params: { id: string } }) {
  const studentId = Number.parseInt(params.id)
  // In a real application, you would fetch data from your API:
  // const student = await api.get(`/students/${studentId}`);
  const student = mockStudents.find((s) => s.id === studentId)

  return <StudentProfile student={student as any} />
}
