"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hollywood_js_1 = require("hollywood-js");
const commandBus_1 = require("application/commandBus");
const getUserByUuidQuery_1 = require("application/query/user/getByUuid/getUserByUuidQuery");
const getUserByUuidHandler_1 = require("application/query/user/getByUuid/getUserByUuidHandler");
const createUserCommand_1 = require("application/command/user/create/createUserCommand");
const createUserHandler_1 = require("application/command/user/create/createUserHandler");
const userRepositoryFactory_1 = require("./repositories/userRepositoryFactory");
const eventStore_1 = require("./eventStore/eventStore");
const registerListeners_1 = require("./eventListeners/registerListeners");
const newResolver = () => (new hollywood_js_1.Application.HandlerResolver());
const queryResolver = newResolver();
const commandResolver = newResolver();
registerListeners_1.default(eventStore_1.eventBus);
queryResolver.addHandler(getUserByUuidQuery_1.default, new getUserByUuidHandler_1.default(userRepositoryFactory_1.default));
commandResolver.addHandler(createUserCommand_1.default, new createUserHandler_1.default(userRepositoryFactory_1.default));
const AppQueryBus = new hollywood_js_1.Application.Bus(queryResolver);
const AppCommandBus = new commandBus_1.default(commandResolver);
exports.default = {
    AppQueryBus,
    AppCommandBus,
};
//# sourceMappingURL=busFactory.js.map