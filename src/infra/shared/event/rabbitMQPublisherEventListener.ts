import { Domain, EventStore } from 'hollywood-js';
import AMQCLi from '../messaging/client';

export default class RabbitMQPublisherEventListener extends EventStore.EventListener {
    constructor(private readonly publisher: AMQCLi){
        super()
    }

    on(message: Domain.DomainMessage): void {
        this.publisher.publish('events', message.eventType, JSON.stringify(message));
    }
}