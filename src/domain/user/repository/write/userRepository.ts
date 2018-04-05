import { Domain, EventStore } from 'hollywood-js';
import User from '../../model/user';

export default class UserRepository implements Domain.IRepository<User> {
    constructor(private eventStore: EventStore.EventStore<User>) {}

    async save(aggregateRoot: User): Promise<void> {
        await this.eventStore.save(aggregateRoot);
    }

    async load(aggregateRootId: string): Promise<User> {
        return await this.eventStore.load(aggregateRootId);
    }
}
