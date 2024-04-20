import { env } from "~/env";
import { GetCacheClient } from "./cache";
import { type RedisClientType } from "redis";

export const GetCommonCacheClient = async ():Promise<RedisClientType> => {
	return await GetCacheClient({
		url: env.REDIS_URI ?? "",
		mode: env.REDIS_MODE
	})
}
