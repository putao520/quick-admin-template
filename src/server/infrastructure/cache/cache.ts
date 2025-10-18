import type { RedisClientType } from 'redis'
import { getClient } from '~/server/mal/redis'

export interface CacheConfig {
  url: string
  mode: 'single' | 'cluster'
  expires?: number
}

export const GetCacheClient = async (options: CacheConfig): Promise<RedisClientType> => {
  const { url, mode } = options
  // Redis cluster connections implement the same command surface we rely on here.
  return (await getClient(url, mode)) as unknown as RedisClientType
}
