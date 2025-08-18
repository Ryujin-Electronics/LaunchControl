const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const adminUsers = [
  {
    name: 'Alex Chen',
    email: 'alex.chen@ryujin.com',
    password: 'admin123',
    role: 'ryujin_admin',
    jobTitle: 'System Administrator',
    phone: '+61 400 123 456',
    organization: {
      name: 'Ryujin Electronics',
      type: 'ryujin',
      domain: 'ryujin.com',
      address: '123 Tech Street, Canberra ACT 2600',
      phone: '+61 2 6123 4567',
      email: 'admin@ryujin.com'
    }
  },
  {
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@ryujin.com',
    password: 'admin123',
    role: 'ryujin_support',
    jobTitle: 'Support Team Lead',
    phone: '+61 400 123 457',
    organization: {
      name: 'Ryujin Electronics',
      type: 'ryujin',
      domain: 'ryujin.com',
      address: '123 Tech Street, Canberra ACT 2600',
      phone: '+61 2 6123 4567',
      email: 'admin@ryujin.com'
    }
  }
]

async function setupAdminUsers() {
  try {
    console.log('Setting up admin users...')

    // First, ensure Ryujin organization exists
    let ryujinOrg = await prisma.organization.findFirst({
      where: { type: 'ryujin' }
    })

    if (!ryujinOrg) {
      console.log('Creating Ryujin organization...')
      ryujinOrg = await prisma.organization.create({
        data: {
          name: 'Ryujin Electronics',
          type: 'ryujin',
          domain: 'ryujin.com',
          address: '123 Tech Street, Canberra ACT 2600',
          phone: '+61 2 6123 4567',
          email: 'admin@ryujin.com',
          status: 'active'
        }
      })
      console.log('Created Ryujin organization:', ryujinOrg.id)
    } else {
      console.log('Ryujin organization already exists:', ryujinOrg.id)
    }

    // Create admin users
    for (const userData of adminUsers) {
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
            organizationId: ryujinOrg.id,
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
            organizationId: ryujinOrg.id,
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

    console.log('Admin users setup completed successfully!')
    console.log('\nAdmin users created:')
    adminUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - ${user.role}`)
    })
    console.log('\nDefault password for all users: admin123')

  } catch (error) {
    console.error('Error setting up admin users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the setup
setupAdminUsers()
