"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const email_1 = require("../../../../domain/user/valueObject/email");
class CreateUserCommand {
    constructor(uuid, email) {
        this.uuid = uuid;
        this.email = email_1.default.fromString(email);
    }
}
exports.default = CreateUserCommand;
//# sourceMappingURL=createUserCommand.js.map