"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hollywood_js_1 = require("hollywood-js");
class RabbitMQPublisherEventListener extends hollywood_js_1.EventStore.EventListener {
    constructor(publisher) {
        super();
        this.publisher = publisher;
    }
    on(event) {
        this.publisher.publish('events', 'domain.events', JSON.stringify(event));
    }
}
exports.default = RabbitMQPublisherEventListener;
//# sourceMappingURL=RabbitMQPublisherEventListener.js.map