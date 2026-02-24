"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UserPlus, Save, X, ChevronRight } from "lucide-react"

interface StudentFormData {
  // Personal Information
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  idNumber: string
  homeLanguage: string

  // Contact Information
  cellNumber: string
  email: string
  address: string
  city: string
  province: string
  postalCode: string

  // Academic Information
  gradeLevel: string
  previousSchool: string

  // Guardian Information
  guardianTitle: string
  guardianFirstName: string
  guardianLastName: string
  guardianRelationship: string
  guardianCellNumber: string
  guardianEmail: string
  guardianOccupation: string
  guardianWorkNumber: string

  // Emergency Contact
  emergencyContactName: string
  emergencyContactNumber: string
  emergencyContactRelationship: string

  // Medical Information
  medicalConditions: string
  allergies: string
  medication: string
  doctorName: string
  doctorNumber: string

  // Additional Information
  transportMethod: string
  afterCareRequired: boolean
  specialNeeds: string
}

export default function StudentRegistrationForm() {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    idNumber: "",
    homeLanguage: "",
    cellNumber: "",
    email: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    gradeLevel: "",
    previousSchool: "",
    guardianTitle: "",
    guardianFirstName: "",
    guardianLastName: "",
    guardianRelationship: "",
    guardianCellNumber: "",
    guardianEmail: "",
    guardianOccupation: "",
    guardianWorkNumber: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactRelationship: "",
    medicalConditions: "",
    allergies: "",
    medication: "",
    doctorName: "",
    doctorNumber: "",
    transportMethod: "",
    afterCareRequired: false,
    specialNeeds: "",
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6

  const handleInputChange = (field: keyof StudentFormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Student Registration Data:", formData)
    // Here you would typically send the data to your backend
    alert("Learner registration submitted successfully!")
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="e.g., Thabo"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="e.g., Mthembu"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  placeholder="0001010000000"
                  maxLength={13}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="homeLanguage">Home Language</Label>
                <Select
                  value={formData.homeLanguage}
                  onValueChange={(value) => handleInputChange("homeLanguage", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Home Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Zulu">isiZulu</SelectItem>
                    <SelectItem value="Xhosa">isiXhosa</SelectItem>
                    <SelectItem value="Afrikaans">Afrikaans</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Sepedi">Sepedi</SelectItem>
                    <SelectItem value="Setswana">Setswana</SelectItem>
                    <SelectItem value="Sesotho">Sesotho</SelectItem>
                    <SelectItem value="Tsonga">Xitsonga</SelectItem>
                    <SelectItem value="Swati">siSwati</SelectItem>
                    <SelectItem value="Venda">Tshivenda</SelectItem>
                    <SelectItem value="Ndebele">isiNdebele</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cellNumber">Cell Number</Label>
                <Input
                  id="cellNumber"
                  value={formData.cellNumber}
                  onChange={(e) => handleInputChange("cellNumber", e.target.value)}
                  placeholder="082 123 4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="thabo.mthembu@email.com"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Physical Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="123 Mandela Street, Soweto"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Johannesburg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Select value={formData.province} onValueChange={(value) => handleInputChange("province", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gauteng">Gauteng</SelectItem>
                    <SelectItem value="Western Cape">Western Cape</SelectItem>
                    <SelectItem value="KwaZulu-Natal">KwaZulu-Natal</SelectItem>
                    <SelectItem value="Eastern Cape">Eastern Cape</SelectItem>
                    <SelectItem value="Free State">Free State</SelectItem>
                    <SelectItem value="Limpopo">Limpopo</SelectItem>
                    <SelectItem value="Mpumalanga">Mpumalanga</SelectItem>
                    <SelectItem value="North West">North West</SelectItem>
                    <SelectItem value="Northern Cape">Northern Cape</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange("postalCode", e.target.value)}
                  placeholder="1809"
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gradeLevel">Grade Level</Label>
                <Select value={formData.gradeLevel} onValueChange={(value) => handleInputChange("gradeLevel", value)}>
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
              <div className="space-y-2">
                <Label htmlFor="previousSchool">Previous School</Label>
                <Input
                  id="previousSchool"
                  value={formData.previousSchool}
                  onChange={(e) => handleInputChange("previousSchool", e.target.value)}
                  placeholder="Name of previous school"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Guardian Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guardianTitle">Title</Label>
                <Select
                  value={formData.guardianTitle}
                  onValueChange={(value) => handleInputChange("guardianTitle", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mr">Mr</SelectItem>
                    <SelectItem value="Mrs">Mrs</SelectItem>
                    <SelectItem value="Ms">Ms</SelectItem>
                    <SelectItem value="Dr">Dr</SelectItem>
                    <SelectItem value="Prof">Prof</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardianFirstName">First Name</Label>
                <Input
                  id="guardianFirstName"
                  value={formData.guardianFirstName}
                  onChange={(e) => handleInputChange("guardianFirstName", e.target.value)}
                  placeholder="e.g., Nomsa"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardianLastName">Last Name</Label>
                <Input
                  id="guardianLastName"
                  value={formData.guardianLastName}
                  onChange={(e) => handleInputChange("guardianLastName", e.target.value)}
                  placeholder="e.g., Mthembu"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardianRelationship">Relationship</Label>
                <Select
                  value={formData.guardianRelationship}
                  onValueChange={(value) => handleInputChange("guardianRelationship", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Grandmother">Grandmother</SelectItem>
                    <SelectItem value="Grandfather">Grandfather</SelectItem>
                    <SelectItem value="Aunt">Aunt</SelectItem>
                    <SelectItem value="Uncle">Uncle</SelectItem>
                    <SelectItem value="Guardian">Legal Guardian</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardianCellNumber">Cell Number</Label>
                <Input
                  id="guardianCellNumber"
                  value={formData.guardianCellNumber}
                  onChange={(e) => handleInputChange("guardianCellNumber", e.target.value)}
                  placeholder="083 234 5678"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardianEmail">Email Address</Label>
                <Input
                  id="guardianEmail"
                  type="email"
                  value={formData.guardianEmail}
                  onChange={(e) => handleInputChange("guardianEmail", e.target.value)}
                  placeholder="nomsa.mthembu@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardianOccupation">Occupation</Label>
                <Input
                  id="guardianOccupation"
                  value={formData.guardianOccupation}
                  onChange={(e) => handleInputChange("guardianOccupation", e.target.value)}
                  placeholder="e.g., Nurse"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardianWorkNumber">Work Number</Label>
                <Input
                  id="guardianWorkNumber"
                  value={formData.guardianWorkNumber}
                  onChange={(e) => handleInputChange("guardianWorkNumber", e.target.value)}
                  placeholder="011 123 4567"
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Emergency Contact & Medical Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                  placeholder="Full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactNumber">Emergency Contact Number</Label>
                <Input
                  id="emergencyContactNumber"
                  value={formData.emergencyContactNumber}
                  onChange={(e) => handleInputChange("emergencyContactNumber", e.target.value)}
                  placeholder="084 567 8901"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactRelationship">Relationship</Label>
                <Input
                  id="emergencyContactRelationship"
                  value={formData.emergencyContactRelationship}
                  onChange={(e) => handleInputChange("emergencyContactRelationship", e.target.value)}
                  placeholder="e.g., Aunt"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctorName">Doctor Name</Label>
                <Input
                  id="doctorName"
                  value={formData.doctorName}
                  onChange={(e) => handleInputChange("doctorName", e.target.value)}
                  placeholder="Dr. Smith"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctorNumber">Doctor Number</Label>
                <Input
                  id="doctorNumber"
                  value={formData.doctorNumber}
                  onChange={(e) => handleInputChange("doctorNumber", e.target.value)}
                  placeholder="011 234 5678"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="medicalConditions">Medical Conditions</Label>
                <Textarea
                  id="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={(e) => handleInputChange("medicalConditions", e.target.value)}
                  placeholder="List any medical conditions (e.g., asthma, diabetes)"
                  rows={3}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  placeholder="List any allergies (food, medication, environmental)"
                  rows={3}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="medication">Current Medication</Label>
                <Textarea
                  id="medication"
                  value={formData.medication}
                  onChange={(e) => handleInputChange("medication", e.target.value)}
                  placeholder="List any current medication and dosage"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transportMethod">Transport Method</Label>
                <Select
                  value={formData.transportMethod}
                  onValueChange={(value) => handleInputChange("transportMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Transport Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="School Transport">School Transport</SelectItem>
                    <SelectItem value="Private Transport">Private Transport</SelectItem>
                    <SelectItem value="Public Transport">Public Transport</SelectItem>
                    <SelectItem value="Walking">Walking</SelectItem>
                    <SelectItem value="Parent Drop-off">Parent Drop-off</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>After Care Required</Label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="afterCare"
                      checked={formData.afterCareRequired === true}
                      onChange={() => handleInputChange("afterCareRequired", true)}
                      className="text-blue-600"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="afterCare"
                      checked={formData.afterCareRequired === false}
                      onChange={() => handleInputChange("afterCareRequired", false)}
                      className="text-blue-600"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="specialNeeds">Special Needs or Additional Information</Label>
                <Textarea
                  id="specialNeeds"
                  value={formData.specialNeeds}
                  onChange={(e) => handleInputChange("specialNeeds", e.target.value)}
                  placeholder="Any special educational needs, dietary requirements, or other important information"
                  rows={4}
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="w-6 h-6 text-blue-600" />
            <span>Learner Registration</span>
          </CardTitle>
          <div className="flex items-center space-x-2 mt-4">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 bg-transparent"
              >
                <X className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button type="submit" className="bg-green-600 hover:bg-green-700 flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Submit Registration</span>
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
