import { PrismaClient } from '@prisma/client'

let db: PrismaClient

if (process.env.NODE_ENV === 'production') {
  console.log('CONNECTING TO PROD PRISMA')

  db = new PrismaClient()
} else {
  console.log('CONNECTING TO DEV PRISMA')
  if (!global.db) {
    console.log('CREATING NEW PRISMA CLIENT')
    global.db = new PrismaClient()
  }
  db = global.db
}

export default db
