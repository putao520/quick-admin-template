import { env } from "~/env";
import { GetCacheClient } from "./cache";
import { type RedisClientType } from "redis";

export const GetDataCacheClient = async ():Promise<RedisClientType> => {
	return await GetCacheClient({
		url: env.PERSISTENT_REDIS_URI ?? "",
		mode: env.PERSISTENT_REDIS_MODE
	})
}
