'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Plus, Edit, Trash2, Zap, Users, BookOpen } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import AutoTimetableGenerator from './AutoTimetableGenerator'

interface TimetableEntry {
  id: number
  schoolClass: { id: number; name: string; grade: number }
  subject: { id: number; name: string }
  teacher: { id: number; user: { username: string } }
  dayOfWeek: string
  startTime: string
  endTime: string
}

interface Teacher {
  id: number
  user: { username: string }
  department: string
}

interface Subject {
  id: number
  name: string
  schoolClass: { id: number; name: string; grade: number }
}

interface SchoolClass {
  id: number
  name: string
  grade: number
}

const DAYS_OF_WEEK = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'
]

export default function TimetableManagement() {
  const [activeTab, setActiveTab] = useState('view')
  const [timetableEntries, setTimetableEntries] = useState<TimetableEntry[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [classes, setClasses] = useState<SchoolClass[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null)
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [selectedWeek, setSelectedWeek] = useState<string>('current')

  const [formData, setFormData] = useState({
    classId: '',
    subjectId: '',
    teacherId: '',
    dayOfWeek: '',
    startTime: '',
    endTime: ''
  })

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      const [timetableRes, teachersRes, subjectsRes, classesRes] = await Promise.all([
        fetch('/api/timetable', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('/api/teachers', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('/api/subjects', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('/api/classes', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
      ])

      if (timetableRes.ok && teachersRes.ok && subjectsRes.ok && classesRes.ok) {
        const [timetableData, teachersData, subjectsData, classesData] = await Promise.all([
          timetableRes.json(),
          teachersRes.json(),
          subjectsRes.json(),
          classesRes.json()
        ])

        setTimetableEntries(timetableData)
        setTeachers(teachersData)
        setSubjects(subjectsData)
        setClasses(classesData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast({
        title: "Error",
        description: "Failed to fetch timetable data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingEntry 
        ? `/api/timetable/${editingEntry.id}`
        : '/api/timetable'
      
      const method = editingEntry ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Timetable entry ${editingEntry ? 'updated' : 'created'} successfully`
        })
        fetchAllData()
        setIsCreateDialogOpen(false)
        setEditingEntry(null)
        setFormData({
          classId: '',
          subjectId: '',
          teacherId: '',
          dayOfWeek: '',
          startTime: '',
          endTime: ''
        })
      }
    } catch (error) {
      console.error('Error saving timetable entry:', error)
      toast({
        title: "Error",
        description: "Failed to save timetable entry",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this timetable entry?')) return
    
    try {
      const response = await fetch(`/api/timetable/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Timetable entry deleted successfully"
        })
        fetchAllData()
      }
    } catch (error) {
      console.error('Error deleting timetable entry:', error)
      toast({
        title: "Error",
        description: "Failed to delete timetable entry",
        variant: "destructive"
      })
    }
  }

  const getFilteredEntries = () => {
    let filtered = timetableEntries
    
    if (selectedClass) {
      filtered = filtered.filter(entry => entry.schoolClass.id.toString() === selectedClass)
    }
    
    return filtered
  }

  const renderTimetableGrid = () => {
    const filteredEntries = getFilteredEntries()
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-gray-50 w-20">Time</th>
              {DAYS_OF_WEEK.map(day => (
                <th key={day} className="border border-gray-300 p-2 bg-gray-50 min-w-40">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map(timeSlot => (
              <tr key={timeSlot}>
                <td className="border border-gray-300 p-2 font-medium bg-gray-50">
                  {timeSlot}
                </td>
                {DAYS_OF_WEEK.map(day => {
                  const entry = filteredEntries.find(
                    e => e.dayOfWeek === day && e.startTime === timeSlot
                  )
                  
                  return (
                    <td key={`${day}-${timeSlot}`} className="border border-gray-300 p-1 h-16 relative">
                      {entry && (
                        <div className="bg-blue-100 rounded p-1 text-xs h-full flex flex-col justify-between">
                          <div>
                            <div className="font-semibold text-blue-800 truncate">
                              {entry.subject.name}
                            </div>
                            <div className="text-blue-600 truncate">
                              {entry.teacher.user.username}
                            </div>
                            <div className="text-blue-500 text-xs">
                              {entry.schoolClass.name}
                            </div>
                          </div>
                          <div className="flex gap-1 mt-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-4 w-4 p-0 hover:bg-blue-200"
                              onClick={() => {
                                setEditingEntry(entry)
                                setFormData({
                                  classId: entry.schoolClass.id.toString(),
                                  subjectId: entry.subject.id.toString(),
                                  teacherId: entry.teacher.id.toString(),
                                  dayOfWeek: entry.dayOfWeek,
                                  startTime: entry.startTime,
                                  endTime: entry.endTime
                                })
                                setIsCreateDialogOpen(true)
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-4 w-4 p-0 hover:bg-red-200 text-red-600"
                              onClick={() => handleDelete(entry.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Timetable Management</h2>
          <p className="text-gray-600">Manage class schedules and generate automatic timetables</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="view" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            View Timetable
          </TabsTrigger>
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Manual Management
          </TabsTrigger>
          <TabsTrigger value="auto" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Auto Generator
          </TabsTrigger>
        </TabsList>

        <TabsContent value="view" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Class Timetable</CardTitle>
                  <CardDescription>View and navigate through class schedules</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Classes</SelectItem>
                      {classes.map(cls => (
                        <SelectItem key={cls.id} value={cls.id.toString()}>
                          {cls.name} (Grade {cls.grade})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {renderTimetableGrid()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Manual Timetable Management</CardTitle>
                  <CardDescription>Add, edit, and remove individual timetable entries</CardDescription>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Entry
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>
                        {editingEntry ? 'Edit Timetable Entry' : 'Add New Timetable Entry'}
                      </DialogTitle>
                      <DialogDescription>
                        Configure the class schedule entry details.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="class">Class</Label>
                            <Select
                              value={formData.classId}
                              onValueChange={(value) => setFormData({ ...formData, classId: value })}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select class" />
                              </SelectTrigger>
                              <SelectContent>
                                {classes.map(cls => (
                                  <SelectItem key={cls.id} value={cls.id.toString()}>
                                    {cls.name} (Grade {cls.grade})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Select
                              value={formData.subjectId}
                              onValueChange={(value) => setFormData({ ...formData, subjectId: value })}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select subject" />
                              </SelectTrigger>
                              <SelectContent>
                                {subjects.map(subject => (
                                  <SelectItem key={subject.id} value={subject.id.toString()}>
                                    {subject.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="teacher">Teacher</Label>
                          <Select
                            value={formData.teacherId}
                            onValueChange={(value) => setFormData({ ...formData, teacherId: value })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              {teachers.map(teacher => (
                                <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                  {teacher.user.username} ({teacher.department})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="day">Day</Label>
                            <Select
                              value={formData.dayOfWeek}
                              onValueChange={(value) => setFormData({ ...formData, dayOfWeek: value })}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select day" />
                              </SelectTrigger>
                              <SelectContent>
                                {DAYS_OF_WEEK.map(day => (
                                  <SelectItem key={day} value={day}>
                                    {day}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="startTime">Start Time</Label>
                            <Select
                              value={formData.startTime}
                              onValueChange={(value) => setFormData({ ...formData, startTime: value })}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Start" />
                              </SelectTrigger>
                              <SelectContent>
                                {TIME_SLOTS.map(time => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="endTime">End Time</Label>
                            <Select
                              value={formData.endTime}
                              onValueChange={(value) => setFormData({ ...formData, endTime: value })}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="End" />
                              </SelectTrigger>
                              <SelectContent>
                                {TIME_SLOTS.map(time => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">
                          {editingEntry ? 'Update' : 'Create'} Entry
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Classes</SelectItem>
                      {classes.map(cls => (
                        <SelectItem key={cls.id} value={cls.id.toString()}>
                          {cls.name} (Grade {cls.grade})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Badge variant="outline">
                    {getFilteredEntries().length} entries
                  </Badge>
                </div>
                
                {renderTimetableGrid()}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auto" className="space-y-4">
          <AutoTimetableGenerator />
        </TabsContent>
      </Tabs>
    </div>
  )
}
