import { Domain } from 'hollywood-js';
import { Message } from 'amqplib';
import AMQCLi from 'infra/shared/messaging/client';
import UserProjectionFactory from "infra/user/query/projection/userProjection";
import UserRepository from 'infra/shared/dependencyInjection/repositories/userRepositoryFactory';
import {log} from "util";

const consumer = new UserProjectionFactory(UserRepository);
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

