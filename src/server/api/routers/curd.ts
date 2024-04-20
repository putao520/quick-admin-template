import { z } from "zod";
/**
 * 这是一个CURD例子,例子使用的对象 json 结构是
 * {
 *     "name" : String,
 *     "age" : Number,
 * }
 *
 * 注意:
 *  这只是一个简单的例子,全部使用的是publicProcedure,这个类型的接口是不需要登录的
 *  例子模拟的是带有索引的CURD操作,实际使用时,需要根据业务需求进行修改
 * */
import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {type TrpcResult} from "~/utils/rpc";


export const curdRouter = createTRPCRouter({
    add: publicProcedure
        .input(z.object({
            name: z.string(),
            age: z.number(),
        }))
        .mutation(async ({ctx, input}): Promise<TrpcResult> => {
            // 向 redis list 中添加数据
            const n = await ctx.persistent.rPush("curd", JSON.stringify(input));
            // 如果需要建立可查询索引,可以这样建立
            const index_name = "name";
            await ctx.persistent.hSet(`curd_${index_name}`, input.name, n);

            return {
                code: "success",
                data: {
                    index: n,
                },
            };
        }),
    get: publicProcedure
        .input(z.object({
            name: z.string(),
        }))
        .query(async ({ctx, input}): Promise<TrpcResult> => {
            // 从 redis list 中获取数据
            const index_name = "name";
            const index_str = await ctx.persistent.hGet(`curd_${index_name}`, input.name);
            if(!index_str){
                return {
                    code: "error",
                    message: "not index",
                }
            }
            const index = parseInt(index_str);
            const data = await ctx.persistent.lIndex("curd", index);
            return !data ? {
                code: "error",
                message: "not found",
            } : {
                code: "success",
                data: JSON.parse(data),
            }
        }),
    del: publicProcedure
        .input(z.object({
            name: z.string(),
        }))
        .mutation(async ({ctx, input}): Promise<TrpcResult> => {
            // 从 redis list 中删除数据
            const index_name = "name";
            const index_str = await ctx.persistent.hGet(`curd_${index_name}`, input.name);
            if (!index_str) {
                return {
                    code: "error",
                    message: "not index",
                }
            }
            const index = parseInt(index_str);
            await ctx.persistent.hDel(`curd_${index_name}`, input.name);
            const data = await ctx.persistent.lIndex("curd", index);
            if(data){
                await ctx.persistent.lRem("curd", index, data);
            }
            return {
                code: "success",
            }
        }),
    update: publicProcedure
        .input(z.object({
            name: z.string(),
            age: z.number(),
        }))
        .mutation(async ({ctx, input}): Promise<TrpcResult> => {
            // 从 redis list 中更新数据
            const index_name = "name";
            const index_str = await ctx.persistent.hGet(`curd_${index_name}`, input.name);
            if (!index_str) {
                return {
                    code: "error",
                    message: "not index",
                }
            }
            const index = parseInt(index_str);
            const data = await ctx.persistent.lIndex("curd", index);
            if (!data) {
                return {
                    code: "error",
                    message: "not index",
                }
            }
            await ctx.persistent.lSet("curd", index, JSON.stringify(input));
            return {
                code: "success",
            }
        }),
    page: publicProcedure
        .input(z.object({
            page: z.number(),
            size: z.number(),
        }))
        .query(async ({ctx, input}): Promise<TrpcResult> => {
            // 分页查询 redis list 数据
            const start = input.page * input.size;
            const end = start + input.size - 1;
            const data = await ctx.persistent.lRange("curd", start, end);
            return {
                code: "success",
                data: data.map((v) => JSON.parse(v)),
            }
        }),
})
