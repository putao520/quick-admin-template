import {createClient, createCluster,} from "redis";
import {sleep} from "~/utils/model/time";

export const getClient = async (url: string, mode: "single" | "cluster") => {
	const connect = async () => {
		const _url = url
		const _mode = mode
		const client = (mode === "cluster") ?
			createCluster({
				rootNodes: url.split(",").map((url) => {
					return {url};
				}),
			}) : createClient({url});
		client.on("error", (err) =>{
			console.log("Redis=>连接中断", err, _url, _mode)
			client.quit().then(() => {
				console.log("Redis=>正在重连...")
			}).catch((e) => {
				console.log("Redis=>退出失败", e, _url, _mode)
			}).finally(() => {
				console.log("Redis=>尝试重连", _url, _mode)
				setTimeout(() => {
					client.connect().then(() => {
						console.log("Redis=>重连成功", _url, _mode)
					}).catch((e) => {
						console.log("Redis=>重连失败", e, _url, _mode)
					})
				}, 5000)
			})
		});
		await client.connect();
		return client;
	}
	while(true){
		try{
			return await connect();
		} catch	(e){
			console.log("Redis=>连接失败", e, url, mode)
			await sleep(5000)
		}
	}
};
