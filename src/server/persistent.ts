import { type RedisClientType } from "redis";
import {GetDataCacheClient} from "~/server/infrastructure/cache/data_cache_client";
import {env} from "~/env";

const globalForPersistent = globalThis as unknown as{
    handle: RedisClientType | undefined;
}

export const persistent = globalForPersistent.handle ?? await GetDataCacheClient();

if (env.NODE_ENV !== "production") globalForPersistent.handle = persistent;
