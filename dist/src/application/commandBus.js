"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hollywood_js_1 = require("hollywood-js");
class CommandBus extends hollywood_js_1.Application.Bus {
    handle(command, successCallback, errorCallback) {
        super.handle(command, successCallback, errorCallback);
    }
}
exports.default = CommandBus;
//# sourceMappingURL=commandBus.js.map