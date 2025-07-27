const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Setting up database...')
  
  // Create a test user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@ryujinelectronics.com' },
    update: {},
    create: {
      email: 'admin@ryujinelectronics.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
    },
  })
  
  console.log('✅ Database setup complete!')
  console.log('📧 Test user created:')
  console.log('   Email: admin@ryujinelectronics.com')
  console.log('   Password: admin123')
  console.log('   Role: admin')
}

main()
  .catch((e) => {
    console.error('❌ Error setting up database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 