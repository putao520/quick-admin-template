import { createTestCaller } from '~/server/api/testing/test-helpers'

describe('curd router', () => {
  it('handles add -> get -> update -> page -> delete lifecycle', async () => {
    const caller = createTestCaller()

    const addResult = await caller.curd.add({ name: 'alice', age: 30 })
    expect(addResult.code).toBe('success')
    expect(addResult.data).toBeDefined()
    expect(addResult.data?.index).toBe(0)

    const getResult = await caller.curd.get({ name: 'alice' })
    expect(getResult.code).toBe('success')
    expect(getResult.data).toEqual({ name: 'alice', age: 30 })

    const updateResult = await caller.curd.update({ name: 'alice', age: 31 })
    expect(updateResult.code).toBe('success')

    const getUpdated = await caller.curd.get({ name: 'alice' })
    expect(getUpdated.code).toBe('success')
    expect(getUpdated.data).toEqual({ name: 'alice', age: 31 })

    const pageResult = await caller.curd.page({ page: 0, size: 10 })
    expect(pageResult.code).toBe('success')
    expect(pageResult.data).toHaveLength(1)
    expect(pageResult.data?.[0]).toEqual({ name: 'alice', age: 31 })

    const deleteResult = await caller.curd.del({ name: 'alice' })
    expect(deleteResult.code).toBe('success')

    const getAfterDelete = await caller.curd.get({ name: 'alice' })
    expect(getAfterDelete.code).toBe('error')

    const pageAfterDelete = await caller.curd.page({ page: 0, size: 10 })
    expect(pageAfterDelete.code).toBe('success')
    expect(pageAfterDelete.data).toEqual([])
  })
})
