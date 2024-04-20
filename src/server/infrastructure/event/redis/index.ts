import {type RedisClientType} from "redis";
import {type EventCallback, type IEvent} from "~/server/infrastructure/event/interface";
import {GetCacheClient} from "~/server/infrastructure/cache/cache";
import {env} from "~/env";

export class SystemEvent implements IEvent{
    private client: RedisClientType;
    constructor(client: RedisClientType) {
        this.client = client;
    }

    public async once(event: string, callback: EventCallback): Promise<this> {
        const cli = this.client.duplicate()
        await cli.connect();
        await cli.subscribe(event, (message, channel) => {
            callback(message, channel);
            cli.unsubscribe(event, callback).then(() => {
                void cli.disconnect();
            }).catch((err) => {
                console.error(err);
            })
        });
        return this
    }

    public async on(event: string, callback: EventCallback): Promise<this> {
        const cli = this.client.duplicate()
        await cli.connect();
        await cli.subscribe(event, (message, channel) => {
            callback(message, channel);
        });
        return this
    }

    public async off(event: string): Promise<this> {
        const cli = this.client.duplicate()
        await cli.connect();
        cli.unsubscribe(event).then(() => {
            cli.disconnect();
        }).catch((err) => {
            console.error(err);
        })
        return this
    }

    public async emit(event: string, data: never): Promise<this> {
        const pub = this.client.duplicate();
        await pub.connect();
        await pub.publish(event, data);
        return this;
    }

    public async close(): Promise<void> {
        await this.client.quit();
    }
}

export const NewEventClient = async (): Promise< SystemEvent| null> => {
    const cli = await GetCacheClient({
        url: env.EVENT_REDIS_URI ?? "",
        mode: env.EVENT_REDIS_MODE,
    })
    return new SystemEvent(cli);
}
