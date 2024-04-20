import {PubSubListener} from "@redis/client/dist/lib/client/pub-sub";

export type EventCallback = PubSubListener

export abstract class IEvent {
    abstract emit(event: string, data: any): Promise<Omit<this, "emit">>

    abstract once(event: string, callback: EventCallback): Promise<Omit<this, "once">>

    abstract on(event: string, callback: EventCallback): Promise<Omit<this, "on">>

    abstract off(event: string): Promise<Omit<this, "off">>

    abstract close(): Promise<void>
}
