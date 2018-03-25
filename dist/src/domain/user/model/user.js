"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hollywood_js_1 = require("hollywood-js");
const userWasCreated_1 = require("../event/userWasCreated");
class User extends hollywood_js_1.Domain.EventSourced {
    getAggregateRootId() {
        return this.uuid;
    }
    static create(uuid, email) {
        const instance = new User();
        instance.raise(new userWasCreated_1.default(uuid, email.value));
        return instance;
    }
    applyUserWasCreated(event) {
        this.uuid = event.uuid;
        this.email = event.email.toString();
        this.createdAt = event.ocurrendOn;
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map