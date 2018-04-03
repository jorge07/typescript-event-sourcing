import * as Promise from 'bluebird';
import * as Redis  from 'redis';
import {RedisClient} from "redis";

Promise.promisifyAll(Redis.RedisClient.prototype);
Promise.promisifyAll(Redis.Multi.prototype);

export interface RedisCli extends RedisClient {
    [x: string]: any
}

export default (params: any): RedisCli => (
    Redis.createClient(params) as RedisCli
);
