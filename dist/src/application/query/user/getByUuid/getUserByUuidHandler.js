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
class GetUserByUuidHandler {
    constructor(userStore) {
        this.userStore = userStore;
    }
    handle(query, success, error) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userStore.load(query.uuid);
                success({ data: user });
            }
            catch (err) {
                error({ message: err.message, code: 404 });
            }
        });
    }
}
exports.default = GetUserByUuidHandler;
//# sourceMappingURL=getUserByUuidHandler.js.map