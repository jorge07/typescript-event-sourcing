import * as Promise from 'bluebird';
import * as Redis  from 'redis';
import {RedisClient} from "redis";
import config from "infra/shared/config";

const { REDIS_HOST, REDIS_PORT } = config;

Promise.promisifyAll(Redis.RedisClient.prototype);
Promise.promisifyAll(Redis.Multi.prototype);

export interface RedisCli extends RedisClient {
    [x: string]: any
}

const createCli = (params: any): RedisCli => (
    Redis.createClient(params) as RedisCli
);

const client: RedisCli = createCli({ host: REDIS_HOST,port: REDIS_PORT});

export default client;
