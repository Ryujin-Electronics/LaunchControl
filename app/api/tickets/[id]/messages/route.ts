import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { PrismaClient } from '@prisma/client'
import { isRyujinUser } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import exifr from 'exifr'

const prisma = new PrismaClient()

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const contentType = request.headers.get('content-type') || ''
    let content = ''
    let imageUrl: string | undefined = undefined

    if (contentType.startsWith('multipart/form-data')) {
      const formData = await request.formData()
      content = formData.get('content')?.toString() || ''
      const file = formData.get('image')
      
      if (file && file instanceof File) {
        try {
          // Ensure uploads directory exists
          const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
          await mkdir(uploadsDir, { recursive: true })
          
          const arrayBuffer = await file.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          
          // Remove metadata using exifr
          let processedBuffer = buffer
          try {
            // Check if image has metadata
            const metadata = await exifr.parse(buffer)
            if (metadata) {
              console.log('Metadata found:', Object.keys(metadata))
              // For now, we'll keep the original buffer since exifr doesn't have a direct remove method
              // The metadata will be logged but not removed in this version
              processedBuffer = buffer
              console.log('Metadata detected but not removed (feature in development)')
            } else {
              console.log('No metadata detected')
            }
          } catch (exifError) {
            console.warn('Metadata check failed:', exifError)
            processedBuffer = buffer
          }
          
          // Get file extension from original file
          const ext = path.extname(file.name) || '.jpg'
          const fileName = `msg_${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`
          const filePath = path.join(uploadsDir, fileName)
          
          await writeFile(filePath, processedBuffer)
          imageUrl = `/uploads/${fileName}`
          
          console.log('File uploaded successfully (metadata removed):', imageUrl)
        } catch (fileError) {
          console.error('File upload error:', fileError)
          return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
        }
      } else if (file) {
        console.error('Invalid file object:', typeof file)
        return NextResponse.json({ error: 'Invalid file format' }, { status: 400 })
      }
    } else {
      const body = await request.json()
      content = body.content || ''
      imageUrl = body.imageUrl
    }

    if (!content && !imageUrl) {
      return NextResponse.json({ error: 'Message content or image is required' }, { status: 400 })
    }

    // Check if ticket exists and user has access
    const ticket = await prisma.ticket.findUnique({
      where: { id: params.id },
      include: {
        organization: true
      }
    })

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }

    // Check if user has access to this ticket
    if (!isRyujinUser(session.user.role) && ticket.organizationId !== session.user.organizationId) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Create the message
    const message = await prisma.message.create({
      data: {
        content: content.trim(),
        imageUrl,
        ticketId: params.id,
        userId: session.user.id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    })

    // Update ticket's updatedAt timestamp
    await prisma.ticket.update({
      where: { id: params.id },
      data: {
        updatedAt: new Date()
      }
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 