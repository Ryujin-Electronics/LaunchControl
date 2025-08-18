const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const clientUsers = [
  {
    name: 'ABC Corp Owner',
    email: 'owner@abccorp.com',
    password: 'owner123',
    role: 'full_access',
    jobTitle: 'Business Owner',
    phone: '+61 400 123 461',
    organization: {
      name: 'ABC Corporation',
      type: 'client',
      domain: 'abccorp.com',
      address: '456 Business Ave, Sydney NSW 2000',
      phone: '+61 2 9123 4567',
      email: 'contact@abccorp.com'
    }
  },
  {
    name: 'ABC Corp User',
    email: 'user@abccorp.com',
    password: 'user123',
    role: 'end_user',
    jobTitle: 'End User',
    phone: '+61 400 123 463',
    organization: {
      name: 'ABC Corporation',
      type: 'client',
      domain: 'abccorp.com',
      address: '456 Business Ave, Sydney NSW 2000',
      phone: '+61 2 9123 4567',
      email: 'contact@abccorp.com'
    }
  }
]

async function setupClientUsers() {
  try {
    console.log('Setting up client users...')

    // First, ensure ABC Corporation exists
    let abcCorp = await prisma.organization.findFirst({
      where: { name: 'ABC Corporation' }
    })

    if (!abcCorp) {
      console.log('Creating ABC Corporation...')
      abcCorp = await prisma.organization.create({
        data: {
          name: 'ABC Corporation',
          type: 'client',
          domain: 'abccorp.com',
          address: '456 Business Ave, Sydney NSW 2000',
          phone: '+61 2 9123 4567',
          email: 'contact@abccorp.com',
          status: 'active'
        }
      })
      console.log('Created ABC Corporation:', abcCorp.id)
    } else {
      console.log('ABC Corporation already exists:', abcCorp.id)
    }

    // Create client users
    for (const userData of clientUsers) {
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
      })

      if (existingUser) {
        console.log(`User ${userData.email} already exists, updating...`)
        
        // Update existing user
        await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            name: userData.name,
            role: userData.role,
            jobTitle: userData.jobTitle,
            phone: userData.phone,
            organizationId: abcCorp.id,
            status: 'active'
          }
        })
        console.log(`Updated user: ${userData.email}`)
      } else {
        console.log(`Creating new user: ${userData.email}`)
        
        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 12)
        
        // Create new user
        await prisma.user.create({
          data: {
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            role: userData.role,
            jobTitle: userData.jobTitle,
            phone: userData.phone,
            organizationId: abcCorp.id,
            status: 'active',
            preferences: {
              notifications: true,
              darkMode: false,
              language: 'en'
            }
          }
        })
        console.log(`Created user: ${userData.email}`)
      }
    }

    console.log('Client users setup completed successfully!')
    console.log('\nClient users created:')
    clientUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - ${user.role}`)
    })
    console.log('\nDefault passwords:')
    console.log('- owner@abccorp.com: owner123')
    console.log('- user@abccorp.com: user123')

  } catch (error) {
    console.error('Error setting up client users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the setup
setupClientUsers()
