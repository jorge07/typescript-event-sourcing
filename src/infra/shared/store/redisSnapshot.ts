import CreateClient, { RedisCli } from "infra/shared/redis/cli";
import config from "infra/shared/config"
import { Domain, EventStore } from "hollywood-js";
import {log} from "util";

const { REDIS_HOST, REDIS_PORT } = config;

export default class RedisSnapshot<T extends Domain.EventSourced> implements EventStore.ISnapshotStoreDBAL<T> {

    private readonly redisCli: RedisCli;
    private readonly type: string;

    constructor(type: string) {
        this.type = type;
        this.redisCli = CreateClient({
            host: REDIS_HOST,
            port: REDIS_PORT
        });
    }

    async get(uuid: Domain.AggregateRootId): Promise<T|null> {
        const snapshot: string|null = await this.redisCli.mgetAsync(this.type + uuid).catch(log);

        if (null === snapshot) {
            return null
        }

        return <T>JSON.parse(snapshot);
    }

    async store(entity: T): Promise<void> {
        await this.redisCli.setAsync(this.type + entity.getAggregateRootId()).catch(log);
    }

}