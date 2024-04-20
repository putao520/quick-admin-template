import { type RedisClientType } from "redis";
import {getClient} from "~/server/mal/redis";


export interface CacheConfig {
	url: string;
	mode: "single" | "cluster";
	expires?: number;
}

export const GetCacheClient = async (options: CacheConfig): Promise<RedisClientType> => {
	const { url, mode } = options;
	// @ts-ignore
	return await getClient(url, mode);
}
