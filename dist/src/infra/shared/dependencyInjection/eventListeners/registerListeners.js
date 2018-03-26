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
const rabbitmq_1 = require("../broker/rabbitmq");
const rabbitMQPublisherEventListener_1 = require("infra/shared/event/rabbitMQPublisherEventListener");
const Register = (eventBus) => __awaiter(this, void 0, void 0, function* () {
    yield rabbitmq_1.default.connect();
    eventBus
        .addListener(new rabbitMQPublisherEventListener_1.default(rabbitmq_1.default));
});
exports.default = Register;
//# sourceMappingURL=registerListeners.js.map