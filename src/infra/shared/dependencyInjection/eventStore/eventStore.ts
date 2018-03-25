import { EventStore } from 'hollywood-js';

const eventBus = new EventStore.EventBus()
const eventStore = new EventStore.InMemoryEventStore(eventBus);

export {
    eventStore,
    eventBus
}