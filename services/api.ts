const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token')
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  }

  // Students API
  async getStudents(classId?: number) {
    const url = classId 
      ? `${API_BASE_URL}/api/students?classId=${classId}`
      : `${API_BASE_URL}/api/students`
    
    const response = await fetch(url, {
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch students')
    }
    
    return response.json()
  }

  async createStudent(studentData: any) {
    const response = await fetch(`${API_BASE_URL}/api/students`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(studentData)
    })
    
    if (!response.ok) {
      throw new Error('Failed to create student')
    }
    
    return response.json()
  }

  async updateStudent(id: number, studentData: any) {
    const response = await fetch(`${API_BASE_URL}/api/students/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(studentData)
    })
    
    if (!response.ok) {
      throw new Error('Failed to update student')
    }
    
    return response.json()
  }

  async deleteStudent(id: number) {
    const response = await fetch(`${API_BASE_URL}/api/students/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete student')
    }
    
    return response.json()
  }

  // Teachers API
  async getTeachers() {
    const response = await fetch(`${API_BASE_URL}/api/teachers`, {
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch teachers')
    }
    
    return response.json()
  }

  async createTeacher(teacherData: any) {
    const response = await fetch(`${API_BASE_URL}/api/teachers`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(teacherData)
    })
    
    if (!response.ok) {
      throw new Error('Failed to create teacher')
    }
    
    return response.json()
  }

  async updateTeacher(id: number, teacherData: any) {
    const response = await fetch(`${API_BASE_URL}/api/teachers/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(teacherData)
    })
    
    if (!response.ok) {
      throw new Error('Failed to update teacher')
    }
    
    return response.json()
  }

  async deleteTeacher(id: number) {
    const response = await fetch(`${API_BASE_URL}/api/teachers/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete teacher')
    }
    
    return response.json()
  }

  // Classes API
  async getClasses() {
    const response = await fetch(`${API_BASE_URL}/api/classes`, {
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch classes')
    }
    
    return response.json()
  }

  async createClass(classData: any) {
    const response = await fetch(`${API_BASE_URL}/api/classes`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(classData)
    })
    
    if (!response.ok) {
      throw new Error('Failed to create class')
    }
    
    return response.json()
  }

  async updateClass(id: number, classData: any) {
    const response = await fetch(`${API_BASE_URL}/api/classes/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(classData)
    })
    
    if (!response.ok) {
      throw new Error('Failed to update class')
    }
    
    return response.json()
  }

  async deleteClass(id: number) {
    const response = await fetch(`${API_BASE_URL}/api/classes/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete class')
    }
    
    return response.json()
  }

  // Subjects API
  async getSubjects(classId?: number) {
    const url = classId 
      ? `${API_BASE_URL}/api/subjects?classId=${classId}`
      : `${API_BASE_URL}/api/subjects`
    
    const response = await fetch(url, {
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch subjects')
    }
    
    return response.json()
  }

  async createSubject(subjectData: any) {
    const response = await fetch(`${API_BASE_URL}/api/subjects`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(subjectData)
    })
    
    if (!response.ok) {
      throw new Error('Failed to create subject')
    }
    
    return response.json()
  }

  async updateSubject(id: number, subjectData: any) {
    const response = await fetch(`${API_BASE_URL}/api/subjects/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(subjectData)
    })
    
    if (!response.ok) {
      throw new Error('Failed to update subject')
    }
    
    return response.json()
  }

  async deleteSubject(id: number) {
    const response = await fetch(`${API_BASE_URL}/api/subjects/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete subject')
    }
    
    return response.json()
  }

  // Announcements API
  async getAnnouncements() {
    const response = await fetch(`${API_BASE_URL}/api/announcements`, {
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch announcements')
    }
    
    return response.json()
  }

  async createAnnouncement(announcementData: any) {
    const response = await fetch(`${API_BASE_URL}/api/announcements`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(announcementData)
    })
    
    if (!response.ok) {
      throw new Error('Failed to create announcement')
    }
    
    return response.json()
  }

  async updateAnnouncement(id: number, announcementData: any) {
    const response = await fetch(`${API_BASE_URL}/api/announcements/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(announcementData)
    })
    
    if (!response.ok) {
      throw new Error('Failed to update announcement')
    }
    
    return response.json()
  }

  async deleteAnnouncement(id: number) {
    const response = await fetch(`${API_BASE_URL}/api/announcements/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete announcement')
    }
    
    return response.json()
  }

  // Timetable API
  async getTimetable(classId?: number) {
    const url = classId 
      ? `${API_BASE_URL}/api/timetable?classId=${classId}`
      : `${API_BASE_URL}/api/timetable`
    
    const response = await fetch(url, {
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch timetable')
    }
    
    return response.json()
  }

  async createTimetableEntry(entryData: any) {
    const response = await fetch(`${API_BASE_URL}/api/timetable`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(entryData)
    })
    
    if (!response.ok) {
      throw new Error('Failed to create timetable entry')
    }
    
    return response.json()
  }

  async updateTimetableEntry(id: number, entryData: any) {
    const response = await fetch(`${API_BASE_URL}/api/timetable/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(entryData)
    })
    
    if (!response.ok) {
      throw new Error('Failed to update timetable entry')
    }
    
    return response.json()
  }

  async deleteTimetableEntry(id: number) {
    const response = await fetch(`${API_BASE_URL}/api/timetable/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete timetable entry')
    }
    
    return response.json()
  }

  // Attendance API
  async getAttendance(studentId?: number, date?: string) {
    let url = `${API_BASE_URL}/api/attendance`
    const params = new URLSearchParams()
    
    if (studentId) params.append('studentId', studentId.toString())
    if (date) params.append('date', date)
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }
    
    const response = await fetch(url, {
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch attendance')
    }
    
    return response.json()
  }

  async markAttendance(attendanceData: any) {
    const response = await fetch(`${API_BASE_URL}/api/attendance`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(attendanceData)
    })
    
    if (!response.ok) {
      throw new Error('Failed to mark attendance')
    }
    
    return response.json()
  }

  // Marks API
  async getMarks(studentId?: number, subjectId?: number) {
    let url = `${API_BASE_URL}/api/marks`
    const params = new URLSearchParams()
    
    if (studentId) params.append('studentId', studentId.toString())
    if (subjectId) params.append('subjectId', subjectId.toString())
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }
    
    const response = await fetch(url, {
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch marks')
    }
    
    return response.json()
  }

  async addMark(markData: any) {
    const response = await fetch(`${API_BASE_URL}/api/marks`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(markData)
    })
    
    if (!response.ok) {
      throw new Error('Failed to add mark')
    }
    
    return response.json()
  }

  async updateMark(id: number, markData: any) {
    const response = await fetch(`${API_BASE_URL}/api/marks/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(markData)
    })
    
    if (!response.ok) {
      throw new Error('Failed to update mark')
    }
    
    return response.json()
  }

  async deleteMark(id: number) {
    const response = await fetch(`${API_BASE_URL}/api/marks/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete mark')
    }
    
    return response.json()
  }
}

export const apiService = new ApiService()
export default apiService
