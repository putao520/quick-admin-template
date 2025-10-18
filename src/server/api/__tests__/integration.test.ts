import type { Session } from 'next-auth'
import { createTestCaller } from '~/server/api/testing/test-helpers'
import { db } from '~/server/db'

const ensureSchema = async () => {
  const tableStatements = [
    `CREATE TABLE IF NOT EXISTS "User" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT,
      "email" TEXT,
      "emailVerified" DATETIME,
      "image" TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS "Account" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "userId" TEXT NOT NULL,
      "type" TEXT NOT NULL,
      "provider" TEXT NOT NULL,
      "providerAccountId" TEXT NOT NULL,
      "refresh_token" TEXT,
      "access_token" TEXT,
      "expires_at" INTEGER,
      "token_type" TEXT,
      "scope" TEXT,
      "id_token" TEXT,
      "session_state" TEXT,
      CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS "Session" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "sessionToken" TEXT NOT NULL,
      "userId" TEXT NOT NULL,
      "expires" DATETIME NOT NULL,
      CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS "Post" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "name" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL,
      "createdById" TEXT NOT NULL,
      CONSTRAINT "Post_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS "VerificationToken" (
      "identifier" TEXT NOT NULL,
      "token" TEXT NOT NULL,
      "expires" DATETIME NOT NULL
    );`,
  ]

  const indexStatements = [
    `CREATE INDEX IF NOT EXISTS "Post_name_idx" ON "Post"("name");`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session"("sessionToken");`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken"("token");`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");`,
  ]

  for (const statement of tableStatements) {
    await db.$executeRawUnsafe(statement)
  }
  for (const statement of indexStatements) {
    await db.$executeRawUnsafe(statement)
  }
}

const createSession = (userId: string, overrides?: Partial<Session>): Session => ({
  user: {
    id: userId,
    name: overrides?.user?.name ?? 'Integration User',
    email: overrides?.user?.email ?? 'integration@example.com',
    image: overrides?.user?.image ?? null,
  },
  expires: overrides?.expires ?? new Date(Date.now() + 60_000).toISOString(),
})

describe('tRPC + Prisma integration', () => {
  beforeAll(async () => {
    await ensureSchema()
  })

  beforeEach(async () => {
    await db.post.deleteMany()
    await db.user.deleteMany()
  })

  it('creates and reads posts through app router using real Prisma', async () => {
    const user = await db.user.create({
      data: {
        name: 'Integration User',
        email: 'integration@example.com',
      },
    })
    const session = createSession(user.id)
    const caller = createTestCaller({ session, db })

    const created = await caller.post.create({ name: 'Integration Post' })

    expect(created.name).toBe('Integration Post')
    expect(created.createdById).toBe(user.id)

    const latest = await caller.post.getLatest()
    expect(latest?.name).toBe('Integration Post')

    const secret = await caller.post.getSecretMessage()
    expect(secret).toBe('you can now see this secret message!')

    const records = await db.post.findMany({ where: { createdById: user.id } })
    expect(records).toHaveLength(1)
  })
})
