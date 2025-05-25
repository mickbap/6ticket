import { PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  const adminPassword = await bcrypt.hash('admin123', 8);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN'
    },
  });
  console.log({ admin });

  const techPassword = await bcrypt.hash('tech123', 8);
  const technician = await prisma.user.upsert({
    where: { email: 'tech@example.com' },
    update: {},
    create: {
      email: 'tech@example.com',
      name: 'Technician User',
      password: techPassword,
      role: 'TECHNICIAN',
    },
  });
  console.log({ technician });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });