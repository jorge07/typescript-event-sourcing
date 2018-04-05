import client, { RedisCli } from "infra/shared/redis/cli";
import { Domain, EventStore } from "hollywood-js";
import {log} from "util";


export default class RedisStore implements EventStore.IEventStoreDBAL {
    private readonly redisCli: RedisCli;
    private readonly type: string;

    constructor(type: string) {
        this.type = type;
        this.redisCli = client;
    }

    append(uuid: string, stream: Domain.DomainEventStream): void {
        const eventsAsJson: string[] = stream.events.map((event: Domain.DomainMessage) => (JSON.stringify(event)));

        if (eventsAsJson.length > 0) {
            this.redisCli.lpushAsync(this.type + uuid, ...eventsAsJson).catch(log);
        }
    }

    async load(uuid: string): Promise<Domain.DomainEventStream> {
        const events: string[] = await this.redisCli.lrangeAsync(this.type + uuid, 0, -1).catch(log);

        if (events.length === 0) {

            throw new EventStore.AggregateRootNotFoundException();
        }

        return new Domain.DomainEventStream(
            <Domain.DomainMessage[]>events.reverse().map((event: string) => (JSON.parse(event)))
        );
    }

    close() {
        this.redisCli.quit();
    }
}
