'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Megaphone, Calendar, Users, Plus, Search, Filter } from 'lucide-react'
import { format } from 'date-fns'

interface Announcement {
  id: number
  content: string
  date: string
  targetAudience: string
  author: {
    id: number
    firstName: string
    lastName: string
  }
}

interface AnnouncementBoardProps {
  userRole?: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT'
}

export default function AnnouncementBoard({ userRole = 'STUDENT' }: AnnouncementBoardProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAudience, setFilterAudience] = useState('ALL')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newAnnouncement, setNewAnnouncement] = useState({
    content: '',
    targetAudience: 'ALL',
    authorId: 1 // This would come from auth context
  })

  // Sample data - in real app this would come from API
  useEffect(() => {
    const sampleAnnouncements: Announcement[] = [
      {
        id: 1,
        content: 'Welcome to the new academic year 2024-2025! We are excited to have all students back. Please ensure you have collected your new textbooks from the library.',
        date: '2024-01-08',
        targetAudience: 'ALL',
        author: { id: 1, firstName: 'System', lastName: 'Administrator' }
      },
      {
        id: 2,
        content: 'Mid-term examinations will be held from March 15-22, 2024. Please check the detailed timetable on the notice board. Students must arrive 30 minutes before each exam.',
        date: '2024-03-01',
        targetAudience: 'STUDENTS',
        author: { id: 1, firstName: 'System', lastName: 'Administrator' }
      },
      {
        id: 3,
        content: 'Parent-Teacher meetings are scheduled for February 10, 2024, from 9:00 AM to 4:00 PM. Please book your slots through the school portal or contact the office.',
        date: '2024-02-01',
        targetAudience: 'PARENTS',
        author: { id: 1, firstName: 'System', lastName: 'Administrator' }
      },
      {
        id: 4,
        content: 'Staff meeting will be held on Friday, January 26, 2024, at 3:30 PM in the conference room. Attendance is mandatory for all teaching staff.',
        date: '2024-01-24',
        targetAudience: 'TEACHERS',
        author: { id: 1, firstName: 'System', lastName: 'Administrator' }
      },
      {
        id: 5,
        content: 'Annual Sports Day will be celebrated on April 15, 2024. Students interested in participating should register with their respective PE teachers by March 30, 2024.',
        date: '2024-01-20',
        targetAudience: 'ALL',
        author: { id: 2, firstName: 'Sarah', lastName: 'Johnson' }
      },
      {
        id: 6,
        content: 'Science Fair 2024 will be held on May 5, 2024. Grade 10 students must submit their project proposals by April 1, 2024. Contact Ms. Johnson for more details.',
        date: '2024-01-25',
        targetAudience: 'STUDENTS',
        author: { id: 3, firstName: 'Michael', lastName: 'Smith' }
      },
      {
        id: 7,
        content: 'Library will remain closed for maintenance from February 5-7, 2024. Students can access digital resources through the school portal during this period.',
        date: '2024-02-02',
        targetAudience: 'ALL',
        author: { id: 1, firstName: 'System', lastName: 'Administrator' }
      },
      {
        id: 8,
        content: 'Grade 10A students: Mathematics extra classes will be conducted every Tuesday and Thursday from 3:30-4:30 PM starting February 1, 2024.',
        date: '2024-01-28',
        targetAudience: 'CLASS_10A',
        author: { id: 2, firstName: 'Sarah', lastName: 'Johnson' }
      },
      {
        id: 9,
        content: 'School uniform policy reminder: All students must wear complete school uniform. Sports shoes are only allowed during PE classes and sports activities.',
        date: '2024-01-15',
        targetAudience: 'STUDENTS',
        author: { id: 1, firstName: 'System', lastName: 'Administrator' }
      },
      {
        id: 10,
        content: 'Cultural Festival 2024 preparations begin next week. Students interested in participating in dance, music, or drama should contact their class teachers.',
        date: '2024-01-30',
        targetAudience: 'ALL',
        author: { id: 1, firstName: 'System', lastName: 'Administrator' }
      }
    ]

    setAnnouncements(sampleAnnouncements)
    setFilteredAnnouncements(sampleAnnouncements)
    setLoading(false)
  }, [])

  // Filter announcements based on search and audience filter
  useEffect(() => {
    let filtered = announcements

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(announcement =>
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.author.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.author.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by target audience
    if (filterAudience !== 'ALL') {
      filtered = filtered.filter(announcement =>
        announcement.targetAudience === filterAudience || announcement.targetAudience === 'ALL'
      )
    }

    setFilteredAnnouncements(filtered)
  }, [announcements, searchTerm, filterAudience])

  const getAudienceBadgeColor = (audience: string) => {
    switch (audience) {
      case 'STUDENTS': return 'bg-blue-100 text-blue-800'
      case 'TEACHERS': return 'bg-green-100 text-green-800'
      case 'PARENTS': return 'bg-purple-100 text-purple-800'
      case 'ALL': return 'bg-gray-100 text-gray-800'
      default: return 'bg-orange-100 text-orange-800'
    }
  }

  const handleCreateAnnouncement = () => {
    const newId = Math.max(...announcements.map(a => a.id)) + 1
    const announcement: Announcement = {
      id: newId,
      content: newAnnouncement.content,
      date: new Date().toISOString().split('T')[0],
      targetAudience: newAnnouncement.targetAudience,
      author: { id: newAnnouncement.authorId, firstName: 'Current', lastName: 'User' }
    }

    setAnnouncements([announcement, ...announcements])
    setNewAnnouncement({ content: '', targetAudience: 'ALL', authorId: 1 })
    setIsCreateDialogOpen(false)
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Megaphone className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">School Announcements</h2>
        </div>
        
        {(userRole === 'ADMIN' || userRole === 'TEACHER') && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter announcement content..."
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select value={newAnnouncement.targetAudience} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, targetAudience: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All</SelectItem>
                      <SelectItem value="STUDENTS">Students</SelectItem>
                      <SelectItem value="TEACHERS">Teachers</SelectItem>
                      <SelectItem value="PARENTS">Parents</SelectItem>
                      <SelectItem value="CLASS_10A">Class 10A</SelectItem>
                      <SelectItem value="CLASS_10B">Class 10B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAnnouncement} disabled={!newAnnouncement.content.trim()}>
                    Create Announcement
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={filterAudience} onValueChange={setFilterAudience}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Audiences</SelectItem>
              <SelectItem value="STUDENTS">Students</SelectItem>
              <SelectItem value="TEACHERS">Teachers</SelectItem>
              <SelectItem value="PARENTS">Parents</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Announcements Grid */}
      <div className="grid gap-4">
        {filteredAnnouncements.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Megaphone className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Announcements Found</h3>
              <p className="text-gray-500 text-center">
                {searchTerm || filterAudience !== 'ALL' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No announcements have been posted yet.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-2">
                    <Badge className={getAudienceBadgeColor(announcement.targetAudience)}>
                      <Users className="h-3 w-3 mr-1" />
                      {announcement.targetAudience.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(announcement.date), 'MMM dd, yyyy')}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {announcement.content}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    By {announcement.author.firstName} {announcement.author.lastName}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
