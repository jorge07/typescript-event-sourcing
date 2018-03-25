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
const createUserCommand_1 = require("../../application/command/user/create/createUserCommand");
const GetUserByUuidQuery_1 = require("../../application/query/user/getByUuid/GetUserByUuidQuery");
exports.default = (commandBus) => (req, res, next) => {
    const { uuid, email } = req.body;
    commandBus.handle(new createUserCommand_1.default(uuid, email), (appResponse) => (res.json(appResponse)), (errResponse) => (next(errResponse)));
};
exports.GetUser = (queryBus) => (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = yield queryBus.handle(new GetUserByUuidQuery_1.default(req.params.uuid), (response) => {
        if (response.name === 'AppError') {
            res.json(response).status(409);
        }
        res.json(response.data.user);
    });
});
//# sourceMappingURL=user.js.map