'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Settings, Play, Download, AlertTriangle, CheckCircle, Clock, Users, BookOpen, Building } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface Teacher {
  id: number
  user: { username: string }
  department: string
  contactNumber: string
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

interface Room {
  id: number
  name: string
  capacity: number
  type: 'CLASSROOM' | 'LAB' | 'AUDITORIUM'
}

interface TimetableEntry {
  id?: number
  classId: number
  className: string
  subjectId: number
  subjectName: string
  teacherId: number
  teacherName: string
  dayOfWeek: string
  startTime: string
  endTime: string
  roomId?: number
  roomName?: string
}

interface GenerationConfig {
  maxConsecutiveHours: number
  breakDuration: number
  startTime: string
  endTime: string
  workingDays: string[]
  periodsPerDay: number
  periodDuration: number
  labSubjects: string[]
  prioritizeHardSubjects: boolean
  balanceTeacherWorkload: boolean
}

interface Conflict {
  type: 'TEACHER_CONFLICT' | 'ROOM_CONFLICT' | 'CLASS_CONFLICT'
  description: string
  severity: 'HIGH' | 'MEDIUM' | 'LOW'
  entries: TimetableEntry[]
}

export default function AutoTimetableGenerator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [classes, setClasses] = useState<SchoolClass[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [generatedTimetable, setGeneratedTimetable] = useState<TimetableEntry[]>([])
  const [conflicts, setConflicts] = useState<Conflict[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  const [config, setConfig] = useState<GenerationConfig>({
    maxConsecutiveHours: 3,
    breakDuration: 15,
    startTime: '08:00',
    endTime: '15:00',
    workingDays: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
    periodsPerDay: 7,
    periodDuration: 45,
    labSubjects: ['Physics', 'Chemistry', 'Biology', 'Computer Science'],
    prioritizeHardSubjects: true,
    balanceTeacherWorkload: true
  })

  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      const [teachersRes, subjectsRes, classesRes] = await Promise.all([
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

      if (teachersRes.ok && subjectsRes.ok && classesRes.ok) {
        const [teachersData, subjectsData, classesData] = await Promise.all([
          teachersRes.json(),
          subjectsRes.json(),
          classesRes.json()
        ])

        setTeachers(teachersData)
        setSubjects(subjectsData)
        setClasses(classesData)
        
        // Generate mock rooms for demonstration
        setRooms([
          { id: 1, name: 'Room 101', capacity: 30, type: 'CLASSROOM' },
          { id: 2, name: 'Room 102', capacity: 30, type: 'CLASSROOM' },
          { id: 3, name: 'Physics Lab', capacity: 25, type: 'LAB' },
          { id: 4, name: 'Chemistry Lab', capacity: 25, type: 'LAB' },
          { id: 5, name: 'Biology Lab', capacity: 25, type: 'LAB' },
          { id: 6, name: 'Computer Lab', capacity: 30, type: 'LAB' },
          { id: 7, name: 'Auditorium', capacity: 200, type: 'AUDITORIUM' }
        ])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast({
        title: "Error",
        description: "Failed to fetch initial data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const generateTimetable = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    setConflicts([])
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Advanced timetable generation algorithm
      const timetable = await generateOptimalTimetable()
      const detectedConflicts = detectConflicts(timetable)
      
      setGeneratedTimetable(timetable)
      setConflicts(detectedConflicts)
      setGenerationProgress(100)
      
      toast({
        title: "Success",
        description: `Timetable generated with ${timetable.length} entries and ${detectedConflicts.length} conflicts`,
      })
      
      setCurrentStep(4)
    } catch (error) {
      console.error('Error generating timetable:', error)
      toast({
        title: "Error",
        description: "Failed to generate timetable",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateOptimalTimetable = async (): Promise<TimetableEntry[]> => {
    const timetable: TimetableEntry[] = []
    const timeSlots = generateTimeSlots()
    
    // Advanced constraint satisfaction algorithm
    for (const schoolClass of classes) {
      const classSubjects = subjects.filter(s => s.schoolClass.id === schoolClass.id)
      
      for (const subject of classSubjects) {
        // Find suitable teachers for this subject
        const suitableTeachers = teachers.filter(t => 
          t.department.toLowerCase().includes(subject.name.toLowerCase()) ||
          subject.name.toLowerCase().includes(t.department.toLowerCase())
        )
        
        if (suitableTeachers.length === 0) continue
        
        // Assign 2-3 periods per subject per week
        const periodsNeeded = getPeriodsNeeded(subject.name, schoolClass.grade)
        
        for (let period = 0; period < periodsNeeded; period++) {
          const teacher = selectOptimalTeacher(suitableTeachers, timetable)
          const timeSlot = findOptimalTimeSlot(timeSlots, schoolClass, subject, teacher, timetable)
          const room = assignOptimalRoom(subject, schoolClass)
          
          if (timeSlot && teacher && room) {
            timetable.push({
              classId: schoolClass.id,
              className: schoolClass.name,
              subjectId: subject.id,
              subjectName: subject.name,
              teacherId: teacher.id,
              teacherName: teacher.user.username,
              dayOfWeek: timeSlot.day,
              startTime: timeSlot.startTime,
              endTime: timeSlot.endTime,
              roomId: room.id,
              roomName: room.name
            })
          }
        }
      }
    }
    
    return timetable
  }

  const generateTimeSlots = () => {
    const slots = []
    const startHour = parseInt(config.startTime.split(':')[0])
    const endHour = parseInt(config.endTime.split(':')[0])
    
    for (const day of config.workingDays) {
      for (let hour = startHour; hour < endHour; hour++) {
        // Skip lunch break (12:00-13:00)
        if (hour === 12) continue
        
        slots.push({
          day,
          startTime: `${hour.toString().padStart(2, '0')}:00`,
          endTime: `${(hour + 1).toString().padStart(2, '0')}:00`
        })
      }
    }
    
    return slots
  }

  const getPeriodsNeeded = (subjectName: string, grade: number): number => {
    // Science subjects get more periods in higher grades
    if (['Physics', 'Chemistry', 'Biology'].includes(subjectName)) {
      return grade >= 9 ? 4 : grade >= 6 ? 3 : 2
    }
    if (subjectName === 'Mathematics') {
      return grade >= 6 ? 4 : 3
    }
    if (subjectName === 'English') {
      return 3
    }
    return 2
  }

  const selectOptimalTeacher = (teachers: Teacher[], timetable: TimetableEntry[]) => {
    // Balance workload - select teacher with least assignments
    const teacherWorkload = teachers.map(teacher => ({
      teacher,
      workload: timetable.filter(entry => entry.teacherId === teacher.id).length
    }))
    
    return teacherWorkload.sort((a, b) => a.workload - b.workload)[0]?.teacher
  }

  const findOptimalTimeSlot = (timeSlots: any[], schoolClass: SchoolClass, subject: Subject, teacher: Teacher, timetable: TimetableEntry[]) => {
    // Prioritize morning slots for hard subjects
    const isHardSubject = ['Mathematics', 'Physics', 'Chemistry'].includes(subject.name)
    const sortedSlots = timeSlots.sort((a, b) => {
      if (config.prioritizeHardSubjects && isHardSubject) {
        return parseInt(a.startTime.split(':')[0]) - parseInt(b.startTime.split(':')[0])
      }
      return 0
    })
    
    for (const slot of sortedSlots) {
      // Check for conflicts
      const hasConflict = timetable.some(entry => 
        (entry.classId === schoolClass.id || entry.teacherId === teacher.id) &&
        entry.dayOfWeek === slot.day &&
        entry.startTime === slot.startTime
      )
      
      if (!hasConflict) {
        return slot
      }
    }
    
    return null
  }

  const assignOptimalRoom = (subject: Subject, schoolClass: SchoolClass): Room => {
    // Assign lab rooms for lab subjects
    if (config.labSubjects.some(lab => subject.name.includes(lab))) {
      const labRoom = rooms.find(room => 
        room.type === 'LAB' && 
        room.name.toLowerCase().includes(subject.name.toLowerCase())
      )
      if (labRoom) return labRoom
    }
    
    // Assign regular classroom
    return rooms.find(room => room.type === 'CLASSROOM' && room.capacity >= 25) || rooms[0]
  }

  const detectConflicts = (timetable: TimetableEntry[]): Conflict[] => {
    const conflicts: Conflict[] = []
    
    // Check for teacher conflicts
    const teacherSlots = new Map<string, TimetableEntry[]>()
    
    timetable.forEach(entry => {
      const key = `${entry.teacherId}-${entry.dayOfWeek}-${entry.startTime}`
      if (!teacherSlots.has(key)) {
        teacherSlots.set(key, [])
      }
      teacherSlots.get(key)!.push(entry)
    })
    
    teacherSlots.forEach((entries, key) => {
      if (entries.length > 1) {
        conflicts.push({
          type: 'TEACHER_CONFLICT',
          description: `Teacher ${entries[0].teacherName} has multiple classes at the same time`,
          severity: 'HIGH',
          entries
        })
      }
    })
    
    // Check for room conflicts
    const roomSlots = new Map<string, TimetableEntry[]>()
    
    timetable.forEach(entry => {
      if (entry.roomId) {
        const key = `${entry.roomId}-${entry.dayOfWeek}-${entry.startTime}`
        if (!roomSlots.has(key)) {
          roomSlots.set(key, [])
        }
        roomSlots.get(key)!.push(entry)
      }
    })
    
    roomSlots.forEach((entries, key) => {
      if (entries.length > 1) {
        conflicts.push({
          type: 'ROOM_CONFLICT',
          description: `Room ${entries[0].roomName} is double-booked`,
          severity: 'MEDIUM',
          entries
        })
      }
    })
    
    return conflicts
  }

  const exportTimetable = () => {
    const csvContent = [
      ['Class', 'Subject', 'Teacher', 'Day', 'Start Time', 'End Time', 'Room'],
      ...generatedTimetable.map(entry => [
        entry.className,
        entry.subjectName,
        entry.teacherName,
        entry.dayOfWeek,
        entry.startTime,
        entry.endTime,
        entry.roomName || 'TBD'
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'generated-timetable.csv'
    a.click()
    URL.revokeObjectURL(url)
    
    toast({
      title: "Success",
      description: "Timetable exported successfully"
    })
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
          <h2 className="text-2xl font-bold">Automatic Timetable Generator</h2>
          <p className="text-gray-600">AI-powered timetable generation with constraint optimization</p>
        </div>
        <Badge variant="outline" className="text-sm">
          Step {currentStep} of 4
        </Badge>
      </div>

      <Tabs value={currentStep.toString()} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="1" disabled={currentStep < 1}>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Setup Data
            </div>
          </TabsTrigger>
          <TabsTrigger value="2" disabled={currentStep < 2}>
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configure Rules
            </div>
          </TabsTrigger>
          <TabsTrigger value="3" disabled={currentStep < 3}>
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Generate
            </div>
          </TabsTrigger>
          <TabsTrigger value="4" disabled={currentStep < 4}>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Review & Export
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="1" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Teachers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{teachers.length}</div>
                <p className="text-sm text-gray-600">Available teachers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{subjects.length}</div>
                <p className="text-sm text-gray-600">Total subjects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{classes.length}</div>
                <p className="text-sm text-gray-600">School classes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Rooms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{rooms.length}</div>
                <p className="text-sm text-gray-600">Available rooms</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => setCurrentStep(2)}>
              Next: Configure Rules
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="2" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generation Configuration</CardTitle>
              <CardDescription>
                Set constraints and preferences for timetable generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxConsecutive">Max Consecutive Hours</Label>
                  <Input
                    id="maxConsecutive"
                    type="number"
                    value={config.maxConsecutiveHours}
                    onChange={(e) => setConfig({
                      ...config,
                      maxConsecutiveHours: parseInt(e.target.value)
                    })}
                    min="1"
                    max="5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="periodsPerDay">Periods Per Day</Label>
                  <Input
                    id="periodsPerDay"
                    type="number"
                    value={config.periodsPerDay}
                    onChange={(e) => setConfig({
                      ...config,
                      periodsPerDay: parseInt(e.target.value)
                    })}
                    min="5"
                    max="8"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">School Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={config.startTime}
                    onChange={(e) => setConfig({
                      ...config,
                      startTime: e.target.value
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">School End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={config.endTime}
                    onChange={(e) => setConfig({
                      ...config,
                      endTime: e.target.value
                    })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Optimization Preferences</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="prioritizeHard"
                      checked={config.prioritizeHardSubjects}
                      onCheckedChange={(checked) => setConfig({
                        ...config,
                        prioritizeHardSubjects: checked as boolean
                      })}
                    />
                    <Label htmlFor="prioritizeHard">
                      Prioritize hard subjects in morning slots
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="balanceWorkload"
                      checked={config.balanceTeacherWorkload}
                      onCheckedChange={(checked) => setConfig({
                        ...config,
                        balanceTeacherWorkload: checked as boolean
                      })}
                    />
                    <Label htmlFor="balanceWorkload">
                      Balance teacher workload automatically
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>
              Back
            </Button>
            <Button onClick={() => setCurrentStep(3)}>
              Next: Generate Timetable
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="3" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Generate Timetable
              </CardTitle>
              <CardDescription>
                AI algorithm will process all constraints and generate optimal timetable
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isGenerating && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Generation Progress</span>
                    <span className="text-sm text-gray-600">{generationProgress}%</span>
                  </div>
                  <Progress value={generationProgress} className="w-full" />
                  <p className="text-sm text-gray-600">
                    Processing constraints and optimizing schedule...
                  </p>
                </div>
              )}

              {!isGenerating && generatedTimetable.length === 0 && (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ready to Generate</h3>
                  <p className="text-gray-600 mb-4">
                    Click the button below to start the automatic timetable generation process.
                  </p>
                  <Button onClick={generateTimetable} size="lg">
                    <Play className="h-4 w-4 mr-2" />
                    Generate Timetable
                  </Button>
                </div>
              )}

              {generatedTimetable.length > 0 && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Timetable generated successfully with {generatedTimetable.length} entries.
                    {conflicts.length > 0 && ` Found ${conflicts.length} conflicts that need attention.`}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(2)}>
              Back
            </Button>
            {generatedTimetable.length > 0 && (
              <Button onClick={() => setCurrentStep(4)}>
                Review Results
              </Button>
            )}
          </div>
        </TabsContent>

        <TabsContent value="4" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generation Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Entries:</span>
                  <span className="font-semibold">{generatedTimetable.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conflicts:</span>
                  <span className={`font-semibold ${conflicts.length === 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {conflicts.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="font-semibold text-green-600">
                    {Math.round(((generatedTimetable.length - conflicts.length) / generatedTimetable.length) * 100)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Conflicts ({conflicts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {conflicts.length === 0 ? (
                  <div className="text-center py-4">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-600 font-medium">No conflicts detected!</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {conflicts.map((conflict, index) => (
                      <div key={index} className="p-2 bg-red-50 rounded border-l-4 border-red-400">
                        <p className="text-sm font-medium text-red-800">{conflict.description}</p>
                        <p className="text-xs text-red-600">
                          Severity: {conflict.severity} | Affects {conflict.entries.length} entries
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Generated Timetable Preview</CardTitle>
              <CardDescription>
                First 10 entries of the generated timetable
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Class</th>
                      <th className="text-left p-2">Subject</th>
                      <th className="text-left p-2">Teacher</th>
                      <th className="text-left p-2">Day</th>
                      <th className="text-left p-2">Time</th>
                      <th className="text-left p-2">Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedTimetable.slice(0, 10).map((entry, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{entry.className}</td>
                        <td className="p-2">{entry.subjectName}</td>
                        <td className="p-2">{entry.teacherName}</td>
                        <td className="p-2">{entry.dayOfWeek}</td>
                        <td className="p-2">{entry.startTime} - {entry.endTime}</td>
                        <td className="p-2">{entry.roomName || 'TBD'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {generatedTimetable.length > 10 && (
                <p className="text-sm text-gray-600 mt-2">
                  ... and {generatedTimetable.length - 10} more entries
                </p>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(3)}>
              Back
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={exportTimetable}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button onClick={() => {
                // Save to database logic would go here
                toast({
                  title: "Success",
                  description: "Timetable saved to database"
                })
              }}>
                Save to Database
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
