"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hollywood_js_1 = require("hollywood-js");
class UserWasCreated extends hollywood_js_1.Domain.DomainEvent {
    constructor(uuid, email) {
        super();
        this.uuid = uuid;
        this.email = email;
    }
}
exports.default = UserWasCreated;
//# sourceMappingURL=userWasCreated.js.map