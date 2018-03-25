"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandling = (err, req, res, next) => {
    res
        .status(err.status || err.code || 500)
        .json({
        message: err.message,
        error: err
    });
};
exports.default = ErrorHandling;
//# sourceMappingURL=errorHandling.js.map