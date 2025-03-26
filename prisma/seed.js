// prisma/seed.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: 'Jean Dupont',
      email: 'jean@example.com',
      password: 'secret123',
      role: 'CLIENT',
    },
  })
}

main()
  .then(() => console.log('✅ Seed complete'))
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
