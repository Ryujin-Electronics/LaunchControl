const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Setting up organizations and users...');

  // Create Ryujin Electronics organization
  let ryujinOrg = await prisma.organization.findFirst({
    where: { name: 'Ryujin Electronics' }
  });

  if (!ryujinOrg) {
    ryujinOrg = await prisma.organization.create({
      data: {
        name: 'Ryujin Electronics',
        type: 'ryujin',
        email: 'admin@ryujinelectronics.com',
        phone: '+1-555-0123',
        address: '123 Tech Street, Innovation City, IC 12345',
        status: 'active'
      }
    });
  }

  console.log('Created Ryujin Electronics organization:', ryujinOrg.id);

  // Create Ryujin admin user
  let ryujinAdmin = await prisma.user.findUnique({
    where: { email: 'admin@ryujinelectronics.com' }
  });

  if (!ryujinAdmin) {
    const ryujinAdminPassword = await bcrypt.hash('admin123', 10);
    ryujinAdmin = await prisma.user.create({
      data: {
        name: 'Ryujin Admin',
        email: 'admin@ryujinelectronics.com',
        password: ryujinAdminPassword,
        role: 'ryujin_admin',
        organizationId: ryujinOrg.id,
        status: 'active'
      }
    });
  }

  console.log('Created Ryujin admin user:', ryujinAdmin.id);

  // Create Ryujin support user
  let ryujinSupport = await prisma.user.findUnique({
    where: { email: 'support@ryujinelectronics.com' }
  });

  if (!ryujinSupport) {
    const ryujinSupportPassword = await bcrypt.hash('support123', 10);
    ryujinSupport = await prisma.user.create({
      data: {
        name: 'Ryujin Support',
        email: 'support@ryujinelectronics.com',
        password: ryujinSupportPassword,
        role: 'ryujin_support',
        organizationId: ryujinOrg.id,
        status: 'active'
      }
    });
  }

  console.log('Created Ryujin support user:', ryujinSupport.id);

  // Create sample client organization (ABC Corp)
  let abcCorp = await prisma.organization.findFirst({
    where: { name: 'ABC Corporation' }
  });

  if (!abcCorp) {
    abcCorp = await prisma.organization.create({
      data: {
        name: 'ABC Corporation',
        type: 'client',
        domain: 'abccorp.com',
        email: 'contact@abccorp.com',
        phone: '+1-555-0456',
        address: '456 Business Ave, Corporate City, CC 67890',
        status: 'active'
      }
    });
  }

  console.log('Created ABC Corporation organization:', abcCorp.id);

  // Create ABC Corp full access user (business owner)
  let abcOwner = await prisma.user.findUnique({
    where: { email: 'owner@abccorp.com' }
  });

  if (!abcOwner) {
    const abcOwnerPassword = await bcrypt.hash('owner123', 10);
    abcOwner = await prisma.user.create({
      data: {
        name: 'ABC Corp Owner',
        email: 'owner@abccorp.com',
        password: abcOwnerPassword,
        role: 'full_access',
        organizationId: abcCorp.id,
        status: 'active'
      }
    });
  }

  console.log('Created ABC Corp owner user:', abcOwner.id);

  // Create ABC Corp IT admin
  let abcIT = await prisma.user.findUnique({
    where: { email: 'itadmin@abccorp.com' }
  });

  if (!abcIT) {
    const abcITPassword = await bcrypt.hash('itadmin123', 10);
    abcIT = await prisma.user.create({
      data: {
        name: 'ABC Corp IT Admin',
        email: 'itadmin@abccorp.com',
        password: abcITPassword,
        role: 'it_admin',
        organizationId: abcCorp.id,
        status: 'active'
      }
    });
  }

  console.log('Created ABC Corp IT admin user:', abcIT.id);

  // Create ABC Corp end user
  let abcUser = await prisma.user.findUnique({
    where: { email: 'user@abccorp.com' }
  });

  if (!abcUser) {
    const abcUserPassword = await bcrypt.hash('user123', 10);
    abcUser = await prisma.user.create({
      data: {
        name: 'ABC Corp User',
        email: 'user@abccorp.com',
        password: abcUserPassword,
        role: 'end_user',
        organizationId: abcCorp.id,
        status: 'active'
      }
    });
  }

  console.log('Created ABC Corp end user:', abcUser.id);

  console.log('\n=== Setup Complete ===');
  console.log('\nRyujin Electronics Users:');
  console.log('Admin: admin@ryujinelectronics.com / admin123');
  console.log('Support: support@ryujinelectronics.com / support123');
  
  console.log('\nABC Corporation Users:');
  console.log('Owner: owner@abccorp.com / owner123');
  console.log('IT Admin: itadmin@abccorp.com / itadmin123');
  console.log('End User: user@abccorp.com / user123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 