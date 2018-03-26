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
const elasticsearch_1 = require("elasticsearch");
const config_1 = require("../config");
const { ELASTIC_HOST, ELASTIC_LOGS } = config_1.default;
class Elastic {
    constructor() {
        this.connect();
    }
    connect() {
        this.client = new elasticsearch_1.Client({
            host: ELASTIC_HOST,
            log: ELASTIC_LOGS
        });
    }
    create(index, event) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client.index({
                index: index,
                type: index,
                id: event.uuid,
                body: event
            });
            return response;
        });
    }
    healthz() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.ping({});
        });
    }
}
exports.default = Elastic;
//# sourceMappingURL=elastic.js.map