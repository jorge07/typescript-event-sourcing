import { Domain, EventStore } from 'hollywood-js';
import User from '../../model/user';

export default class UserRepository implements Domain.IRepository {
    constructor(private eventStore: EventStore.IEventStore) {}

    save(aggregateRoot: Domain.EventSourced): void {
        this.eventStore.append(
            aggregateRoot.getAggregateRootId(),
            aggregateRoot.getUncommitedEvents()
        );
    }

    load(aggregateRootId: string): User {
        const eventStream = this.eventStore.load(aggregateRootId);
        const user = new User();

        return user.fromHistory(eventStream);
    }
}
