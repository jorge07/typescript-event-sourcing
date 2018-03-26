"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invalidArgumentError_1 = require("domain/shared/error/invalidArgumentError");
class Email {
    constructor() {
        this.regex = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    }
    static fromString(rawEmail) {
        const instance = new Email();
        const err = instance.validate(rawEmail);
        if (err) {
            throw err;
        }
        return instance;
    }
    validate(value) {
        if (!this.regex.test(value)) {
            return new invalidArgumentError_1.default('Invalid Email: ' + value + ' ' + this.regex.test(value));
        }
        this.value = value;
    }
    toString() {
        return this.value;
    }
}
exports.default = Email;
//# sourceMappingURL=email.js.map