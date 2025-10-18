import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'
import type { TrpcResult } from '~/utils/rpc'

const LIST_KEY = 'curd'
const INDEX_HASH_PREFIX = 'curd_name'

const getIndexKey = () => INDEX_HASH_PREFIX

export const curdRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
        age: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<TrpcResult> => {
      const listIndex = (await ctx.persistent.rPush(LIST_KEY, JSON.stringify(input))) - 1
      await ctx.persistent.hSet(getIndexKey(), input.name, listIndex)

      return {
        code: 'success',
        data: {
          index: listIndex,
        },
      }
    }),
  get: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ ctx, input }): Promise<TrpcResult> => {
      const storedIndex = await ctx.persistent.hGet(getIndexKey(), input.name)
      if (storedIndex === null) {
        return {
          code: 'error',
          message: 'not index',
        }
      }

      const index = Number.parseInt(storedIndex, 10)
      const data = await ctx.persistent.lIndex(LIST_KEY, index)

      if (!data) {
        return {
          code: 'error',
          message: 'not found',
        }
      }

      return {
        code: 'success',
        data: JSON.parse(data) as unknown,
      }
    }),
  del: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<TrpcResult> => {
      const storedIndex = await ctx.persistent.hGet(getIndexKey(), input.name)
      if (storedIndex === null) {
        return {
          code: 'error',
          message: 'not index',
        }
      }

      const index = Number.parseInt(storedIndex, 10)
      await ctx.persistent.hDel(getIndexKey(), input.name)
      const data = await ctx.persistent.lIndex(LIST_KEY, index)

      if (data) {
        await ctx.persistent.lRem(LIST_KEY, index, data)
      }

      return {
        code: 'success',
      }
    }),
  update: publicProcedure
    .input(
      z.object({
        name: z.string(),
        age: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<TrpcResult> => {
      const storedIndex = await ctx.persistent.hGet(getIndexKey(), input.name)
      if (storedIndex === null) {
        return {
          code: 'error',
          message: 'not index',
        }
      }

      const index = Number.parseInt(storedIndex, 10)
      const existing = await ctx.persistent.lIndex(LIST_KEY, index)

      if (!existing) {
        return {
          code: 'error',
          message: 'not index',
        }
      }

      await ctx.persistent.lSet(LIST_KEY, index, JSON.stringify(input))

      return {
        code: 'success',
      }
    }),
  page: publicProcedure
    .input(
      z.object({
        page: z.number(),
        size: z.number(),
      }),
    )
    .query(async ({ ctx, input }): Promise<TrpcResult> => {
      const start = input.page * input.size
      const end = start + input.size - 1
      const slice = await ctx.persistent.lRange(LIST_KEY, start, end)

      return {
        code: 'success',
        data: slice.map((value) => JSON.parse(value) as unknown),
      }
    }),
})
