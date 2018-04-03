import { EventStore } from 'hollywood-js';
import RedisStore from "infra/shared/store/redisStore";

const eventBus = new EventStore.EventBus();
const eventStore = new RedisStore('user', eventBus);

export {
    eventStore,
    eventBus
}