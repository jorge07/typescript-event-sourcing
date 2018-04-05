import CreateClient, { RedisCli } from "infra/shared/redis/cli";
import config from "infra/shared/config"
import { Domain, EventStore } from "hollywood-js";
import {log} from "util";
import DomainEventStream from "hollywood-js/src/Domain/Event/DomainEventStream";
import {DomainMessage} from "hollywood-js/src/Domain/index";

const { REDIS_HOST, REDIS_PORT } = config;

export default class RedisStore implements EventStore.IEventStoreDBAL {
    private readonly redisCli: RedisCli;
    private readonly type: string;
    private readonly eventBus: EventStore.EventBus;

    constructor(type: string, eventBus: EventStore.EventBus) {
        this.eventBus = eventBus;
        this.type = type;
        this.redisCli = CreateClient({
            host: REDIS_HOST,
            port: REDIS_PORT
        });
    }

    append(uuid: string, stream: Domain.DomainEventStream): void {
        const events = stream.events;
        const eventsAsJson: string[] = stream.events.map((event: Domain.DomainMessage)=>(JSON.stringify(event)));

        if (eventsAsJson.length > 0) {
            this.redisCli.lpushAsync(this.type + uuid, ...eventsAsJson).catch(log);
        }

        events.forEach((message: DomainMessage) => {
            this.eventBus.publish(message);
        });
    }

    async load(uuid: string): Promise<DomainEventStream> {
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
