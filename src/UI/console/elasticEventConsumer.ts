import { Domain } from 'hollywood-js';
import { Message } from 'amqplib';
import AMQCLi from 'infra/shared/messaging/client';
import EventsToElastic from 'infra/shared/event/eventsToElastic';
import Elastic from 'infra/shared/elastic/elastic';
import {log} from "util";

const consumer = new EventsToElastic(new Elastic());
const broker = new AMQCLi();

broker.connect().then(
    () => {
        broker.consume('events', 'events', (msg: Message) => {
            consumer.send(<Domain.DomainMessage>(JSON.parse(msg.content.toString()) as any)).catch(log)
        })
    }
);
