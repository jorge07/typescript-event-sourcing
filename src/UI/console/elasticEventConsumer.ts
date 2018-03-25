import { log } from 'util';
import AMQCLi from '../../infra/shared/messaging/client';
import { Message } from 'amqplib';
import EventsToElastic from '../../infra/shared/event/eventsToElastic';
import Elastic from '../../infra/shared/elastic/elastic';
import { Domain } from 'hollywood-js';

const consumer = new EventsToElastic(new Elastic())
const broker = new AMQCLi();

broker.connect().then(
    () => {
        broker.consume('events', 'events', (msg: Message) => {
            consumer.send(<Domain.DomainMessage>(JSON.parse(msg.content.toString()) as any))
        })
    }
)

