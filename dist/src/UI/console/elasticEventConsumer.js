"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("infra/shared/messaging/client");
const eventsToElastic_1 = require("infra/shared/event/eventsToElastic");
const elastic_1 = require("infra/shared/elastic/elastic");
const consumer = new eventsToElastic_1.default(new elastic_1.default());
const broker = new client_1.default();
broker.connect().then(() => {
    broker.consume('events', 'events', (msg) => {
        consumer.send(JSON.parse(msg.content.toString()));
    });
});
//# sourceMappingURL=elasticEventConsumer.js.map