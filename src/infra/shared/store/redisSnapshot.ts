import client, { RedisCli } from "infra/shared/redis/cli";
import { Domain, EventStore } from "hollywood-js";
import { isString, log } from "util";


export default class RedisSnapshot implements EventStore.ISnapshotStoreDBAL {

    private readonly redisCli: RedisCli;
    private readonly type: string;

    constructor(type: string) {
        this.type = type;
        this.redisCli = client;
    }

    async get(uuid: Domain.AggregateRootId): Promise<any|null> {
        const snapshot: string|null = await this.redisCli.getAsync(this.type + uuid).catch(log);


        return isString(snapshot) ? JSON.parse(snapshot) : null;
    }

    async store(entity: Domain.EventSourced): Promise<void> {
        await this.redisCli.setAsync(this.type + entity.getAggregateRootId(), JSON.stringify(entity)).catch(log);
    }

}