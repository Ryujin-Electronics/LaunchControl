import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { image } = await req.json()
  if (!image) {
    return NextResponse.json({ error: 'No image provided' }, { status: 400 })
  }
  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { image },
    })
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile image' }, { status: 500 })
  }
}
