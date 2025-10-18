import type { Session } from 'next-auth'

import { createCaller } from '~/server/api/root'
import { createInMemoryPersistent } from '~/server/persistent'

type CallerContext = Extract<Parameters<typeof createCaller>[0], { db: unknown }>
export type TestCallerDb = CallerContext['db']

interface TestCallerOptions {
  session?: Session | null
  persistent?: CallerContext['persistent']
  db?: TestCallerDb
}

export const createTestCaller = (options: TestCallerOptions = {}) => {
  const ctx = {
    session: options.session ?? null,
    persistent: options.persistent ?? createInMemoryPersistent(),
    db: options.db ?? ({} as TestCallerDb),
  }

  return createCaller(ctx as CallerContext)
}

interface TestPost {
  id: string
  name: string
  createdById: string
  createdAt: Date
}

export const createMockPostDb = () => {
  const posts: TestPost[] = []
  let counter = 0

  return {
    post: {
      create: jest.fn(
        async ({ data }: { data: { name: string; createdBy: { connect: { id: string } } } }) => {
          counter += 1
          const entry: TestPost = {
            id: `post-${counter}`,
            name: data.name,
            createdById: data.createdBy.connect.id,
            createdAt: new Date(counter),
          }
          posts.push(entry)
          return entry
        },
      ),
      findFirst: jest.fn(async ({ where }: { where: { createdBy: { id: string } } }) => {
        const userPosts = posts
          .filter((item) => item.createdById === where.createdBy.id)
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        return userPosts[0] ?? null
      }),
    },
  }
}
