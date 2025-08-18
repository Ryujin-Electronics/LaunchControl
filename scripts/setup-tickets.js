const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function setupTickets() {
  try {
    console.log('Setting up test tickets...')

    // Get existing organizations and users
    const ryujinOrg = await prisma.organization.findFirst({
      where: { name: 'Ryujin Electronics' }
    })

    const abcOrg = await prisma.organization.findFirst({
      where: { name: 'ABC Corporation' }
    })

    if (!ryujinOrg || !abcOrg) {
      console.log('Organizations not found. Please run setup-organizations.js first.')
      return
    }

    const ryujinAdmin = await prisma.user.findFirst({
      where: { email: 'admin@ryujinelectronics.com' }
    })

    const ryujinSupport = await prisma.user.findFirst({
      where: { email: 'support@ryujinelectronics.com' }
    })

    const abcOwner = await prisma.user.findFirst({
      where: { email: 'owner@abccorp.com' }
    })

    const abcITAdmin = await prisma.user.findFirst({
      where: { email: 'itadmin@abccorp.com' }
    })

    const abcEndUser = await prisma.user.findFirst({
      where: { email: 'user@abccorp.com' }
    })

    if (!ryujinAdmin || !ryujinSupport || !abcOwner || !abcITAdmin || !abcEndUser) {
      console.log('Users not found. Please run setup-organizations.js first.')
      return
    }

    // Create test tickets
    const tickets = [
      {
        title: 'Network connectivity issues',
        description: 'We are experiencing intermittent network connectivity issues in our office. The connection drops every 10-15 minutes and takes about 2-3 minutes to restore. This is affecting our daily operations.',
        status: 'open',
        priority: 'high',
        type: 'support',
        category: 'network',
        createdBy: abcEndUser.id,
        organizationId: abcOrg.id
      },
      {
        title: 'Software license renewal',
        description: 'Our Adobe Creative Suite licenses are expiring next month. We need to renew 15 licenses for our design team. Please provide pricing and renewal options.',
        status: 'in_progress',
        priority: 'medium',
        type: 'purchase_request',
        category: 'software',
        createdBy: abcITAdmin.id,
        organizationId: abcOrg.id,
        assignedTo: ryujinSupport.id
      },
      {
        title: 'Server maintenance request',
        description: 'We need to schedule routine maintenance for our production servers. Please let us know the best time slots available and what maintenance tasks will be performed.',
        status: 'open',
        priority: 'low',
        type: 'support',
        category: 'hardware',
        createdBy: abcOwner.id,
        organizationId: abcOrg.id
      },
      {
        title: 'Email system down',
        description: 'Our email system is completely down. No one can send or receive emails. This is critical for our business operations. Need immediate assistance.',
        status: 'resolved',
        priority: 'urgent',
        type: 'support',
        category: 'software',
        createdBy: abcEndUser.id,
        organizationId: abcOrg.id,
        assignedTo: ryujinAdmin.id
      },
      {
        title: 'New employee onboarding',
        description: 'We have 3 new employees starting next week and need to set up their accounts, email addresses, and access to our internal systems.',
        status: 'open',
        priority: 'medium',
        type: 'support',
        category: 'account',
        createdBy: abcITAdmin.id,
        organizationId: abcOrg.id
      }
    ]

    for (const ticketData of tickets) {
      const existingTicket = await prisma.ticket.findFirst({
        where: {
          title: ticketData.title,
          organizationId: ticketData.organizationId
        }
      })

      if (!existingTicket) {
        const ticket = await prisma.ticket.create({
          data: ticketData
        })

        // Add some initial messages to tickets
        if (ticket.status === 'resolved') {
          await prisma.message.create({
            data: {
              content: 'Issue has been resolved. Email system is back online and all services are functioning normally.',
              ticketId: ticket.id,
              userId: ticket.assignedTo || ryujinAdmin.id
            }
          })
        } else if (ticket.status === 'in_progress') {
          await prisma.message.create({
            data: {
              content: 'Working on this request. Will provide pricing options by end of day.',
              ticketId: ticket.id,
              userId: ticket.assignedTo || ryujinSupport.id
            }
          })
        }

        console.log(`Created ticket: ${ticket.title}`)
      } else {
        console.log(`Ticket already exists: ${ticketData.title}`)
      }
    }

    console.log('Test tickets setup completed!')
  } catch (error) {
    console.error('Error setting up tickets:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setupTickets() 