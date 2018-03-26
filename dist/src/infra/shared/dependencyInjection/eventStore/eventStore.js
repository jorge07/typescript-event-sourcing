"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hollywood_js_1 = require("hollywood-js");
const eventBus = new hollywood_js_1.EventStore.EventBus();
exports.eventBus = eventBus;
const eventStore = new hollywood_js_1.EventStore.InMemoryEventStore(eventBus);
exports.eventStore = eventStore;
//# sourceMappingURL=eventStore.js.map