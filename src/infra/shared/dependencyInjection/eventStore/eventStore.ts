import { EventStore } from 'hollywood-js';
import RedisStore from "infra/shared/store/redisStore";
import User from "domain/user/model/user";
import RedisSnapshot from "infra/shared/store/redisSnapshot";

const eventBus = new EventStore.EventBus();
const eventStoreDbal = new RedisStore('user');
const snapshotDbal = new RedisSnapshot('user');

const userEventStore = new EventStore.EventStore(User, eventStoreDbal, eventBus, snapshotDbal);

export {
    userEventStore,
    eventBus
}