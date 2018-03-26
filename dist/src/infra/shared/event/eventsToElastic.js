"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventsToElastic {
    constructor(esCli) {
        this.esCli = esCli;
    }
    send(event) {
        return this.esCli.create('events', event);
    }
}
exports.default = EventsToElastic;
//# sourceMappingURL=eventsToElastic.js.map