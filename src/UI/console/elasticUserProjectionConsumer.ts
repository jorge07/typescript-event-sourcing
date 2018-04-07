import { Domain } from 'hollywood-js';
import { Message } from 'amqplib';
import AMQCLi from 'infra/shared/messaging/client';
import UserProjectionFactory from "infra/user/query/projection/userProjection";
import {log} from "util";
import {userEventStore} from "infra/shared/dependencyInjection/eventStore/eventStore";

const consumer = new UserProjectionFactory(userEventStore);
const broker = new AMQCLi();

broker.connect().then(
    () => {
        broker.consume('events', 'user', (msg: Message) => {
            const domainMessage = <Domain.DomainMessage>(JSON.parse(msg.content.toString()) as any);

            console.log('Revieced: ', domainMessage);

            consumer.generateUserProjection(domainMessage.uuid).catch(log);
        })
    }
);

