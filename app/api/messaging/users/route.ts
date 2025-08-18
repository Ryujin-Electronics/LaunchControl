import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/messaging/users - Get users for starting conversations
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const excludeConversationId = searchParams.get('excludeConversationId')

    // Build where clause
    const whereClause: any = {
      id: { not: session.user.id }, // Exclude current user
      status: 'active'
    }

    // Add search filter
    if (search) {
      whereClause.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { jobTitle: { contains: search } }
      ]
    }

    // If excluding users from a specific conversation, filter them out
    if (excludeConversationId) {
      const existingParticipants = await prisma.conversationParticipant.findMany({
        where: {
          conversationId: excludeConversationId,
          isActive: true
        },
        select: { userId: true }
      })
      
      const participantIds = existingParticipants.map(p => p.userId)
      if (participantIds.length > 0) {
        whereClause.id = {
          notIn: [session.user.id, ...participantIds]
        }
      }
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        jobTitle: true,
        role: true,
        organization: {
          select: {
            name: true,
            type: true
          }
        }
      },
      orderBy: [
        { name: 'asc' },
        { email: 'asc' }
      ],
      take: 50
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
