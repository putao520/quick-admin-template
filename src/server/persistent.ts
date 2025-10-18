import type { RedisClientType } from 'redis'
import { env } from '~/env'
import { GetDataCacheClient } from '~/server/infrastructure/cache/data_cache_client'

// Minimal in-memory fallback for development or when Redis URL is not configured
export class MemoryPersistent {
  private list: Map<string, string[]> = new Map<string, string[]>()
  private hash: Map<string, Map<string, string>> = new Map<string, Map<string, string>>()

  async rPush(key: string, value: string): Promise<number> {
    const arr = this.list.get(key) ?? []
    arr.push(value)
    this.list.set(key, arr)
    return arr.length
  }

  async hSet(key: string, field: string, value: string | number): Promise<number> {
    const h = this.hash.get(key) ?? new Map<string, string>()
    h.set(field, String(value))
    this.hash.set(key, h)
    return 1
  }

  async hGet(key: string, field: string): Promise<string | null> {
    const h = this.hash.get(key)
    return h?.get(field) ?? null
  }

  async hDel(key: string, field: string): Promise<number> {
    const h = this.hash.get(key)
    if (!h) return 0
    const existed = h.delete(field) ? 1 : 0
    if (h.size === 0) this.hash.delete(key)
    return existed
  }

  async lIndex(key: string, index: number): Promise<string | null> {
    const arr = this.list.get(key) ?? []
    const val = arr[index]
    return val ?? null
  }

  async lSet(key: string, index: number, value: string): Promise<'OK'> {
    const arr = this.list.get(key) ?? []
    arr[index] = value
    this.list.set(key, arr)
    return 'OK'
  }

  async lRem(key: string, count: number, element: string): Promise<number> {
    // Custom behavior tailored to project usage: treat `count` as index-like hint
    const arr = this.list.get(key) ?? []
    let removed = 0
    if (Number.isInteger(count) && count >= 0 && count < arr.length) {
      if (arr[count] === element) {
        arr.splice(count, 1)
        removed = 1
      }
    } else {
      // Fallback: remove first matching occurrence
      const i = arr.indexOf(element)
      if (i >= 0) {
        arr.splice(i, 1)
        removed = 1
      }
    }
    this.list.set(key, arr)
    return removed
  }

  async lRange(key: string, start: number, end: number): Promise<string[]> {
    const arr = this.list.get(key) ?? []
    const realEnd = end === -1 ? arr.length - 1 : end
    return arr.slice(start, realEnd + 1)
  }
}

export const createInMemoryPersistent = () => new MemoryPersistent()

type PersistentHandle = RedisClientType | MemoryPersistent

const globalForPersistent = globalThis as unknown as {
  handle: PersistentHandle | undefined
}

export const persistent: PersistentHandle =
  globalForPersistent.handle ??
  (env.PERSISTENT_REDIS_URI ? await GetDataCacheClient() : createInMemoryPersistent())

if (env.NODE_ENV !== 'production') globalForPersistent.handle = persistent
