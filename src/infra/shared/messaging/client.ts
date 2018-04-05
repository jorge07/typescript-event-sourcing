import { log } from 'util';
import { Connection, Channel, connect, Message } from 'amqplib';
import config from '../config'

const { MESSAGE_BROKER } = config

export default class AMQCLi {
    private connection: Connection | null;
    private channel: Channel | null;

    private readonly defaultExchange: string = 'events';
    private readonly defaultOptions: Object = { durable: true };
    
    async connect(): Promise<Channel> {
        if (! this.connection) {
            const conn = this.connection = await connect(MESSAGE_BROKER);
            this.manageConnection();
            const channel = this.channel = await conn.createConfirmChannel();
            await channel.assertExchange(this.defaultExchange, 'topic', this.defaultOptions);
            log('CONNECTED TO BROKER');
        }

        return this.channel;
    }

    private manageConnection() {
        this.connection.on('close', this.connect)
    }

    async publish(exchange: string = 'events', routingKey: string = 'domain', message: string): Promise<boolean | void> {
        try {
            return this.channel.publish(exchange, routingKey, Buffer.from(message));
        } catch(err) {
            log(err);
            throw err
        }
    }

    async consume(exchange: string = 'events', queue: string = 'events', action: (mgs: Message | null) => any) {
        await this.channel.assertQueue(queue, {exclusive: false});
        await this.channel.bindQueue(queue, exchange, queue);
        await this.channel.consume(queue, action, {noAck: true});
    }

    close(): void {
        this.channel.close();
        this.connection.close();

        this.channel = null;
        this.connection = null;
    }
}