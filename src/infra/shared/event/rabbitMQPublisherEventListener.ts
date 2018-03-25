import { Domain, EventStore } from 'hollywood-js';
import { log } from 'util';
import AMQCLi from '../messaging/client';

export default class RabbitMQPublisherEventListener extends EventStore.EventListener {
    constructor(private readonly publisher: AMQCLi){
        super()
    }

    on(event: Domain.DomainEvent): void {
        this.publisher.publish('events', 'domain.events', JSON.stringify(event));
    }
}