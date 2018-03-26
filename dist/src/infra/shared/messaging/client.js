"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const amqplib_1 = require("amqplib");
const config_1 = require("../config");
const { MESSAGE_BROKER } = config_1.default;
class AMQCLi {
    constructor() {
        this.defaultExchange = 'events';
        this.defaultOptions = { durable: true };
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                const conn = this.connection = yield amqplib_1.connect(MESSAGE_BROKER);
                this.manageConnection();
                const channel = this.channel = yield conn.createConfirmChannel();
                yield channel.assertExchange(this.defaultExchange, 'topic', this.defaultOptions);
                util_1.log('CONNECTED TO BROKER');
            }
            return this.channel;
        });
    }
    manageConnection() {
        this.connection.on('close', this.connect);
    }
    publish(exchange = 'events', routingKey = 'domain', message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.channel.publish(exchange, routingKey, Buffer.from(message));
            }
            catch (err) {
                util_1.log(err);
                throw err;
            }
        });
    }
    consume(exchange = 'events', queue = 'events', action) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertQueue(queue, { exclusive: false });
            yield this.channel.bindQueue(queue, exchange, '#');
            yield this.channel.consume(queue, action, { noAck: true });
        });
    }
    close() {
        this.channel.close();
        this.connection.close();
        this.channel = null;
        this.connection = null;
    }
}
exports.default = AMQCLi;
//# sourceMappingURL=client.js.map