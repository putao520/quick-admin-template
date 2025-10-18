process.env.SKIP_ENV_VALIDATION ??= '1'

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { Readable } from 'node:stream'

import RedisMock from 'ioredis-mock'
import AWSMock from 'mock-aws-s3'

type MessageListener = (message: string, channel: string) => void

type RedisInstance = InstanceType<typeof RedisMock>

class RedisClientShim {
  private inner: RedisInstance
  private messageMap: Map<MessageListener, (channel: string, message: string) => void>

  constructor(inner?: RedisInstance) {
    this.inner = inner ?? new RedisMock()
    this.messageMap = new Map()
  }

  async connect(): Promise<this> {
    if (typeof this.inner.connect === 'function') {
      await this.inner.connect()
    }
    return this
  }

  on(event: string, listener: (...args: unknown[]) => void): this {
    this.inner.on(event, listener)
    return this
  }

  duplicate(): RedisClientShim {
    return new RedisClientShim(this.inner.duplicate())
  }

  async subscribe(channel: string, listener: MessageListener): Promise<number> {
    const adapter = (messageChannel: string, message: string) => {
      if (messageChannel === channel) {
        listener(message, channel)
      }
    }
    this.messageMap.set(listener, adapter)
    this.inner.on('message', adapter)
    return (await this.inner.subscribe(channel)) as number
  }

  async unsubscribe(channel: string, listener?: MessageListener): Promise<number> {
    if (listener) {
      const adapter = this.messageMap.get(listener)
      if (adapter) {
        this.inner.off('message', adapter)
        this.messageMap.delete(listener)
      }
    }
    return (await this.inner.unsubscribe(channel)) as number
  }

  async publish(channel: string, message: string): Promise<number> {
    return await this.inner.publish(channel, message)
  }

  async quit(): Promise<'OK'> {
    return await this.inner.quit()
  }

  async disconnect(): Promise<void> {
    this.inner.disconnect()
  }
}

const redisInstances = new Map<string, RedisInstance>()

jest.mock('~/server/mal/redis', () => {
  return {
    getClient: async (url: string, mode: 'single' | 'cluster') => {
      if (mode === 'cluster') {
        throw new Error('Mock Redis does not support cluster mode in tests')
      }
      const key = url ?? 'mock-redis-default'
      const inner = redisInstances.get(key) ?? new RedisMock()
      redisInstances.set(key, inner)
      const client = new RedisClientShim(inner)
      await client.connect()
      return client
    },
  }
})

AWSMock.config.basePath = path.join(os.tmpdir(), 'mock-s3-buckets')

jest.mock('minio', () => {
  class MinioMockClient {
    private bucket: string
    private s3: AWSMock.S3
    private ensured: Promise<unknown>

    constructor(options: { bucket: string }) {
      this.bucket = options.bucket
      this.s3 = new AWSMock.S3({ params: { Bucket: this.bucket } })
      this.ensured = this.ensureBucket()
    }

    private async ensureBucket() {
      try {
        await this.s3.createBucket({ Bucket: this.bucket }).promise()
      } catch (error) {
        // Bucket may already exist in mock
        if ((error as { code?: string }).code !== 'BucketAlreadyOwnedByYou') {
          throw error
        }
      }
    }

    async fPutObject(bucket: string, key: string, filePath: string) {
      await this.ensured
      const stream = fs.createReadStream(filePath)
      const result = await this.s3
        .upload({
          Bucket: bucket,
          Key: key,
          Body: stream,
        })
        .promise()
      return { etag: result.ETag ?? 'mock-etag' }
    }

    async putObject(bucket: string, key: string, body: Buffer | string) {
      await this.ensured
      const result = await this.s3
        .putObject({
          Bucket: bucket,
          Key: key,
          Body: body,
        })
        .promise()
      return { etag: result.ETag ?? 'mock-etag' }
    }

    async removeObject(bucket: string, key: string) {
      await this.ensured
      await this.s3
        .deleteObject({
          Bucket: bucket,
          Key: key,
        })
        .promise()
    }

    async getObject(bucket: string, key: string) {
      await this.ensured
      const result = await this.s3
        .getObject({
          Bucket: bucket,
          Key: key,
        })
        .promise()
      const buffer = result.Body as Buffer
      const readable = Readable.from(buffer)
      return readable
    }

    async fGetObject(bucket: string, key: string, destination: string) {
      await this.ensured
      const result = await this.s3
        .getObject({
          Bucket: bucket,
          Key: key,
        })
        .promise()
      await fs.promises.writeFile(destination, result.Body as Buffer)
    }

    async listObjectsV2(bucket: string, prefix?: string) {
      await this.ensured
      const result = await this.s3
        .listObjectsV2({
          Bucket: bucket,
          Prefix: prefix,
        })
        .promise()
      return result
    }

    async presignedUrl(method: string, bucket: string, key: string) {
      void method
      return `https://mock-s3.local/${bucket}/${key}`
    }
  }

  return { Client: MinioMockClient }
})
