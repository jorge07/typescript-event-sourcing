import { Domain, EventStore } from 'hollywood-js';
import AMQCLi from 'infra/shared/messaging/client';

export default class UserSubscriber extends EventStore.EventSubscriber {
    constructor(private readonly publisher: AMQCLi){
        super()
    }

    onUserWasCreated(event: Domain.DomainEvent): void {
        this.publisher.publish('events', 'user', JSON.stringify(event));
    }
}