import { Domain, EventStore } from 'hollywood-js';
import User from '../../model/user';

export default class UserRepository implements Domain.IRepository {
    constructor(private eventStore: EventStore.IEventStore) {}

    async save(aggregateRoot: Domain.EventSourced): Promise<void> {
        await this.eventStore.append(
            aggregateRoot.getAggregateRootId(),
            aggregateRoot.getUncommitedEvents()
        );
    }

    async load(aggregateRootId: string): Promise<User> {
        const eventStream = await this.eventStore.load(aggregateRootId);

        return (new User()).fromHistory(eventStream);
    }
}
