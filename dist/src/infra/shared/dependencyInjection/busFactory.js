"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hollywood_js_1 = require("hollywood-js");
const commandBus_1 = require("../../../application/commandBus");
const getUserByUuidQuery_1 = require("../../../application/query/user/getByUuid/getUserByUuidQuery");
const getUserByUuidHandler_1 = require("../../../application/query/user/getByUuid/getUserByUuidHandler");
const userRepository_1 = require("../../../domain/user/repository/write/userRepository");
const createUserCommand_1 = require("../../../application/command/user/create/createUserCommand");
const createUserHandler_1 = require("../../../application/command/user/create/createUserHandler");
const RabbitMQPublisherEventListener_1 = require("../event/RabbitMQPublisherEventListener");
const newResolver = () => (new hollywood_js_1.Application.HandlerResolver());
const queryResolver = newResolver();
const commandResolver = newResolver();
const eventBus = new hollywood_js_1.EventStore.EventBus();
const eventStore = new hollywood_js_1.EventStore.InMemoryEventStore(eventBus);
const eventPubblisher = new RabbitMQPublisherEventListener_1.default();
const userRepository = new userRepository_1.default(eventStore);
eventBus.addListener(eventPubblisher);
queryResolver.addHandler(getUserByUuidQuery_1.default, new getUserByUuidHandler_1.default(userRepository));
commandResolver.addHandler(createUserCommand_1.default, new createUserHandler_1.default(userRepository));
const AppQueryBus = new hollywood_js_1.Application.Bus(queryResolver);
const AppCommandBus = new commandBus_1.default(commandResolver);
exports.default = {
    AppQueryBus,
    AppCommandBus,
};
//# sourceMappingURL=busFactory.js.map