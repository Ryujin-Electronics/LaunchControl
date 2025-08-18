import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-config'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'
import { isRyujinUser } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const organizationId = searchParams.get('organizationId')

    // Build where clause based on user role and filters
    let whereClause: any = {}

    // If Ryujin user, they can see all tickets or filter by organization
    if (isRyujinUser(session.user.role)) {
      if (organizationId) {
        whereClause.organizationId = organizationId
      }
    } else {
      // Client users can only see their organization's tickets
      whereClause.organizationId = session.user.organizationId
    }

    // Add status filter
    if (status) {
      whereClause.status = status
    }

    // Add priority filter
    if (priority) {
      whereClause.priority = priority
    }

    const tickets = await prisma.ticket.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        assignedUser: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        organization: {
          select: {
            id: true,
            name: true,
            type: true
          }
        },
        messages: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1,
          include: {
            user: {
              select: {
                name: true
              }
            }
          }
        },
        _count: {
          select: {
            messages: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return NextResponse.json(tickets)
  } catch (error) {
    console.error('Error fetching tickets:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, priority, type, category } = body

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
    }

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        priority: priority || 'medium',
        type: type || 'support',
        category: category || 'other',
        createdBy: session.user.id,
        organizationId: session.user.organizationId!,
        status: 'open'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        organization: {
          select: {
            id: true,
            name: true,
            type: true
          }
        }
      }
    })

    return NextResponse.json(ticket, { status: 201 })
  } catch (error) {
    console.error('Error creating ticket:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 