const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Find all client users (full_access, it_admin, end_user)
  const clientRoles = ['full_access', 'it_admin', 'end_user']
  const users = await prisma.user.findMany({ where: { role: { in: clientRoles } } })

  // Ensure there is at least one client organization
  let defaultOrg = await prisma.organization.findFirst({ where: { type: 'client', status: 'active' } })
  if (!defaultOrg) {
    defaultOrg = await prisma.organization.create({
      data: {
        name: 'Default Client Org',
        type: 'client',
        status: 'active',
      },
    })
    console.log('Created default client organization:', defaultOrg.id)
  }

  for (const user of users) {
    let changed = false
    // Fix missing or inactive organization
    let org = null
    if (!user.organizationId) {
      org = defaultOrg
      changed = true
    } else {
      org = await prisma.organization.findUnique({ where: { id: user.organizationId } })
      if (!org || org.status !== 'active') {
        org = defaultOrg
        changed = true
      }
    }
    // Fix user status
    if (user.status !== 'active') {
      changed = true
    }
    if (changed) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          organizationId: org.id,
          status: 'active',
        },
      })
      console.log(`Fixed user ${user.email}: org=${org.id}, status=active`)
    }
  }
  console.log('All client users checked and fixed.')
}

main().catch(e => { console.error(e); process.exit(1) })
