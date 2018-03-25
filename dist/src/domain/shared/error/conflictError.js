"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConflictError {
    constructor(message, status = 409) {
        this.message = message;
        this.status = status;
    }
}
exports.default = ConflictError;
//# sourceMappingURL=conflictError.js.map