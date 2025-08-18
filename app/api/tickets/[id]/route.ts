import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-config'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'
import { isRyujinUser, hasPermission } from '@/lib/auth'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: params.id },
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
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }

    // Check if user has access to this ticket
    if (!isRyujinUser(session.user.role) && ticket.organizationId !== session.user.organizationId) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // After updating or fetching the ticket, ensure messages is always an array and parentTicket is always defined or undefined
    const safeTicket = {
      ...ticket,
      messages: Array.isArray((ticket as any).messages) ? (ticket as any).messages : [],
      parentTicket: (ticket as any).parentTicket ? { id: (ticket as any).parentTicket.id, title: (ticket as any).parentTicket.title } : undefined
    }
    return NextResponse.json(safeTicket)
  } catch (error) {
    console.error('Error fetching ticket:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { status, priority, assignedTo, title, description, category, resolutionDescription } = body

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

    // If resolving, set resolvedById, resolutionDescription, resolvedAt
    let patchData: any = {
      ...(status && { status }),
      ...(priority && { priority }),
      ...(assignedTo && { assignedTo }),
      ...(title && { title }),
      ...(description && { description }),
      ...(category && { category }),
      updatedAt: new Date()
    }
    if (status === 'resolved') {
      patchData.resolvedById = session.user.id
      patchData.resolutionDescription = resolutionDescription || patchData.resolutionDescription
      patchData.resolvedAt = new Date()
    }
    // Allow Ryujin to edit/finalize resolutionDescription
    if (typeof resolutionDescription === 'string' && isRyujinUser(session.user.role)) {
      patchData.resolutionDescription = resolutionDescription
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id: params.id },
      data: patchData,
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
        }
      }
    })

    return NextResponse.json(updatedTicket)
  } catch (error) {
    console.error('Error updating ticket:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST: Reopen ticket (clone with parentTicketId)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const ticket = await prisma.ticket.findUnique({ where: { id: params.id } })
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }
    // Only the original user or Ryujin can reopen
    if (!isRyujinUser(session.user.role) && ticket.createdBy !== session.user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }
    // Create new ticket with parentTicketId
    const newTicket = await prisma.ticket.create({
      data: {
        title: ticket.title + ' (Reopened)',
        description: ticket.description,
        status: 'open',
        priority: ticket.priority,
        type: ticket.type,
        category: ticket.category,
        createdBy: session.user.id,
        organizationId: ticket.organizationId,
        parentTicketId: ticket.id // This is correct for the Ticket model
      }
    })
    return NextResponse.json(newTicket, { status: 201 })
  } catch (error) {
    console.error('Error reopening ticket:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only Ryujin users can delete tickets
    if (!isRyujinUser(session.user.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: params.id }
    })

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 })
    }

    await prisma.ticket.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Ticket deleted successfully' })
  } catch (error) {
    console.error('Error deleting ticket:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 