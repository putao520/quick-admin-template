import type { Session } from 'next-auth'

import {
  createMockPostDb,
  createTestCaller,
  type TestCallerDb,
} from '~/server/api/testing/test-helpers'

const createSession = (overrides?: Partial<Session>): Session => ({
  user: {
    id: 'user-1',
    name: 'Tester',
    email: 'tester@example.com',
    image: null,
    ...overrides?.user,
  },
  expires: overrides?.expires ?? new Date(Date.now() + 60_000).toISOString(),
})

describe('post router', () => {
  it('creates and fetches posts for authenticated users', async () => {
    const db = createMockPostDb()
    const session = createSession()
    const caller = createTestCaller({ session, db: db as unknown as TestCallerDb })

    const created = await caller.post.create({ name: 'demo' })
    expect(created.name).toBe('demo')
    expect(created.createdById).toBe(session.user.id)

    const latest = await caller.post.getLatest()
    expect(latest).not.toBeNull()
    expect(latest?.name).toBe('demo')

    const secret = await caller.post.getSecretMessage()
    expect(secret).toBe('you can now see this secret message!')

    const hello = await caller.post.hello({ text: 'world' })
    expect(hello.greeting).toBe('Hello world')
  })

  it('rejects protected procedures without a session', async () => {
    const db = createMockPostDb()
    const caller = createTestCaller({ session: null, db: db as unknown as TestCallerDb })

    await expect(caller.post.getSecretMessage()).rejects.toHaveProperty('code', 'UNAUTHORIZED')
  })
})
