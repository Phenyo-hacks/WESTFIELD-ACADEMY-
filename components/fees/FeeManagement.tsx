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
import { DollarSign, Search, Plus, Edit, Trash2, Eye, Download, AlertCircle, CheckCircle } from "lucide-react"

interface FeeRecord {
  id: number
  studentId: string
  studentName: string
  feeType: string
  amount: number
  dueDate: string
  status: "Paid" | "Pending" | "Overdue"
  paymentDate?: string
  grade: string
}

const mockFeeRecords: FeeRecord[] = [
  {
    id: 1,
    studentId: "STU2024001",
    studentName: "Thabo Mthembu",
    feeType: "School Fees",
    amount: 15000,
    dueDate: "2024-02-15",
    status: "Paid",
    paymentDate: "2024-02-10",
    grade: "Grade 10",
  },
  {
    id: 2,
    studentId: "STU2024002",
    studentName: "Nomsa Dlamini",
    feeType: "Transport Fee",
    amount: 2500,
    dueDate: "2024-02-15",
    status: "Pending",
    grade: "Grade 9",
  },
  {
    id: 3,
    studentId: "STU2024003",
    studentName: "Sipho Ndlovu",
    feeType: "Uniform Fee",
    amount: 1200,
    dueDate: "2024-01-30",
    status: "Overdue",
    grade: "Grade 11",
  },
  {
    id: 4,
    studentId: "STU2024004",
    studentName: "Lerato Mokoena",
    feeType: "Textbook Fee",
    amount: 3500,
    dueDate: "2024-02-20",
    status: "Paid",
    paymentDate: "2024-02-18",
    grade: "Grade 12",
  },
  {
    id: 5,
    studentId: "STU2024005",
    studentName: "Mandla Khumalo",
    feeType: "Library Fine",
    amount: 250,
    dueDate: "2024-02-10",
    status: "Overdue",
    grade: "Grade 10",
  },
  {
    id: 6,
    studentId: "STU2024006",
    studentName: "Zanele Mahlangu",
    feeType: "Sports Club Fee",
    amount: 1000,
    dueDate: "2024-03-01",
    status: "Pending",
    grade: "Grade 11",
  },
  {
    id: 7,
    studentId: "STU2024007",
    studentName: "Bongani Sithole",
    feeType: "Exam Fee",
    amount: 500,
    dueDate: "2024-02-25",
    status: "Paid",
    paymentDate: "2024-02-22",
    grade: "Grade 12",
  },
  {
    id: 8,
    studentId: "STU2024008",
    studentName: "Precious Nkomo",
    feeType: "School Fees",
    amount: 15000,
    dueDate: "2024-02-15",
    status: "Pending",
    grade: "Grade 9",
  },
]

export default function FeeManagement() {
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>(mockFeeRecords)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedFeeType, setSelectedFeeType] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingFee, setEditingFee] = useState<FeeRecord | null>(null)

  const filteredFees = feeRecords.filter((fee) => {
    const matchesSearch =
      fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.feeType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || fee.status === selectedStatus
    const matchesFeeType = selectedFeeType === "all" || fee.feeType === selectedFeeType

    return matchesSearch && matchesStatus && matchesFeeType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700 border-green-200"
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Overdue":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleAddFee = (feeData: Partial<FeeRecord>) => {
    const newFee: FeeRecord = {
      id: feeRecords.length + 1,
      studentId: feeData.studentId || "",
      studentName: feeData.studentName || "",
      feeType: feeData.feeType || "",
      amount: feeData.amount || 0,
      dueDate: feeData.dueDate || "",
      status: "Pending",
      grade: feeData.grade || "",
    }
    setFeeRecords([...feeRecords, newFee])
    setIsAddDialogOpen(false)
  }

  const handleEditFee = (updatedFee: FeeRecord) => {
    setFeeRecords(feeRecords.map((fee) => (fee.id === updatedFee.id ? updatedFee : fee)))
    setEditingFee(null)
    setIsAddDialogOpen(false)
  }

  const handleDeleteFee = (id: number) => {
    setFeeRecords(feeRecords.filter((fee) => fee.id !== id))
  }

  const totalFees = feeRecords.reduce((sum, fee) => sum + fee.amount, 0)
  const paidFees = feeRecords.filter((fee) => fee.status === "Paid").reduce((sum, fee) => sum + fee.amount, 0)
  const pendingFees = feeRecords.filter((fee) => fee.status === "Pending").reduce((sum, fee) => sum + fee.amount, 0)
  const overdueFees = feeRecords.filter((fee) => fee.status === "Overdue").reduce((sum, fee) => sum + fee.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fee Management</h1>
          <p className="text-gray-600">Manage student fees and payments</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setEditingFee(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Fee Record
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingFee ? "Edit Fee Record" : "Add New Fee Record"}</DialogTitle>
                <DialogDescription>
                  {editingFee ? "Update the fee record information." : "Enter the fee details to create a new record."}
                </DialogDescription>
              </DialogHeader>
              <FeeForm
                initialData={editingFee}
                onSubmit={editingFee ? handleEditFee : handleAddFee}
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
                <p className="text-sm font-medium text-gray-600">Total Fees</p>
                <p className="text-2xl font-bold text-gray-900">R{totalFees.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fees Collected</p>
                <p className="text-2xl font-bold text-green-600">R{paidFees.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Fees</p>
                <p className="text-2xl font-bold text-yellow-600">R{pendingFees.toLocaleString()}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue Fees</p>
                <p className="text-2xl font-bold text-red-600">R{overdueFees.toLocaleString()}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
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
                  placeholder="Search by student name, ID, or fee type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedFeeType} onValueChange={setSelectedFeeType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by Fee Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Fee Types</SelectItem>
                  <SelectItem value="School Fees">School Fees</SelectItem>
                  <SelectItem value="Transport Fee">Transport Fee</SelectItem>
                  <SelectItem value="Uniform Fee">Uniform Fee</SelectItem>
                  <SelectItem value="Textbook Fee">Textbook Fee</SelectItem>
                  <SelectItem value="Library Fine">Library Fine</SelectItem>
                  <SelectItem value="Sports Club Fee">Sports Club Fee</SelectItem>
                  <SelectItem value="Exam Fee">Exam Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fee Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Records ({filteredFees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-500 border-b">
                  <th className="pb-3">Student</th>
                  <th className="pb-3">Student ID</th>
                  <th className="pb-3">Fee Type</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Due Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Payment Date</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredFees.map((fee) => (
                  <tr key={fee.id} className="border-b border-gray-100">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {fee.studentName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{fee.studentName}</p>
                          <p className="text-gray-500">{fee.grade}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-mono text-gray-600">{fee.studentId}</td>
                    <td className="py-4 text-gray-600">{fee.feeType}</td>
                    <td className="py-4 font-semibold text-gray-900">R{fee.amount.toLocaleString()}</td>
                    <td className="py-4 text-gray-600">{fee.dueDate}</td>
                    <td className="py-4">
                      <Badge className={getStatusColor(fee.status)}>{fee.status}</Badge>
                    </td>
                    <td className="py-4 text-gray-600">{fee.paymentDate || "-"}</td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingFee(fee)
                            setIsAddDialogOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteFee(fee.id)}
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

function FeeForm({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData?: Partial<FeeRecord> | null
  onSubmit: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<FeeRecord>>(
    initialData || {
      studentId: "",
      studentName: "",
      feeType: "",
      amount: 0,
      dueDate: "",
      status: "Pending",
      grade: "",
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
          <Label htmlFor="studentId">Student ID</Label>
          <Input
            id="studentId"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="studentName">Student Name</Label>
          <Input
            id="studentName"
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="feeType">Fee Type</Label>
          <Select value={formData.feeType} onValueChange={(value) => setFormData({ ...formData, feeType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Fee Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="School Fees">School Fees</SelectItem>
              <SelectItem value="Transport Fee">Transport Fee</SelectItem>
              <SelectItem value="Uniform Fee">Uniform Fee</SelectItem>
              <SelectItem value="Textbook Fee">Textbook Fee</SelectItem>
              <SelectItem value="Library Fine">Library Fine</SelectItem>
              <SelectItem value="Sports Club Fee">Sports Club Fee</SelectItem>
              <SelectItem value="Exam Fee">Exam Fee</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (ZAR)</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: Number.parseInt(e.target.value) || 0 })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="grade">Grade</Label>
          <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Grade" />
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value as "Paid" | "Pending" | "Overdue" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {initialData ? "Save Changes" : "Add Fee Record"}
        </Button>
      </div>
    </form>
  )
}
