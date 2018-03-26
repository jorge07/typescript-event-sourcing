"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createUserCommand_1 = require("application/command/user/create/createUserCommand");
const GetUserByUuidQuery_1 = require("application/query/user/getByUuid/GetUserByUuidQuery");
exports.CreateUser = (commandBus) => (req, res, next) => {
    const { uuid, email } = req.body;
    commandBus.handle(new createUserCommand_1.default(uuid, email), (appResponse) => (res.json(appResponse)), (errResponse) => (next(errResponse)));
};
exports.GetUser = (queryBus) => (req, res, next) => {
    queryBus.handle(new GetUserByUuidQuery_1.default(req.params.uuid), (response) => {
        res.json(response.data);
    }, next);
};
//# sourceMappingURL=user.js.map