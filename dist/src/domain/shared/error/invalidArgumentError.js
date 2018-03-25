"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidArgumentError {
    constructor(message, status = 400) {
        this.message = message;
        this.status = status;
    }
}
exports.default = InvalidArgumentError;
//# sourceMappingURL=invalidArgumentError.js.map