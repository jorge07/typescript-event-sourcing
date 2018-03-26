"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = require("domain/user/repository/write/userRepository");
const eventStore_1 = require("../eventStore/eventStore");
exports.default = new userRepository_1.default(eventStore_1.eventStore);
//# sourceMappingURL=userRepositoryFactory.js.map