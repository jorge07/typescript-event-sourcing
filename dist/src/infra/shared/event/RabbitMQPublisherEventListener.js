"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hollywood_js_1 = require("hollywood-js");
const client_1 = require("../messaging/client");
class RabbitMQPublisherEventListener extends hollywood_js_1.EventStore.EventListener {
    on(event) {
        this.publish(event);
    }
    publish(event) {
        client_1.default.publish('events', 'domain.events', JSON.stringify(event));
    }
}
exports.default = RabbitMQPublisherEventListener;
//# sourceMappingURL=RabbitMQPublisherEventListener.js.map