"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const client_1 = require("../../infra/shared/messaging/client");
const broker = new client_1.default();
broker.publish('events', 'events', 'caca');
broker.consume('events', 'events', (msg) => {
    util_1.log(msg.content.toString());
});
//# sourceMappingURL=eventListener.js.map