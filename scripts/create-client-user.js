const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  // Ensure a client organization exists
  let org = await prisma.organization.findFirst({ where: { type: 'client', status: 'active' } })
  if (!org) {
    org = await prisma.organization.create({
      data: {
        name: 'ABC Corp',
        type: 'client',
        status: 'active',
      },
    })
    console.log('Created default client organization:', org.id)
  }

  // Check if user exists
  const email = 'owner@abccorp.com'
  let user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    const password = await bcrypt.hash('owner123', 12)
    user = await prisma.user.create({
      data: {
        name: 'ABC Owner',
        email,
        password,
        role: 'full_access',
        status: 'active',
        organizationId: org.id,
      },
    })
    console.log('Created client user:', user.email)
  } else {
    console.log('Client user already exists:', user.email)
  }
}

main().catch(e => { console.error(e); process.exit(1) })
