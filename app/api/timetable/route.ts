import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const classId = searchParams.get('classId')
    
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/timetable`
    if (classId) {
      url += `?classId=${classId}`
    }
    
    const response = await fetch(url, {
      headers: {
        'Authorization': request.headers.get('Authorization') || ''
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch timetable')
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching timetable:', error)
    return NextResponse.json(
      { error: 'Failed to fetch timetable' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/timetable`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || ''
      },
      body: JSON.stringify(body)
    })
    
    if (!response.ok) {
      throw new Error('Failed to create timetable entry')
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating timetable entry:', error)
    return NextResponse.json(
      { error: 'Failed to create timetable entry' },
      { status: 500 }
    )
  }
}
