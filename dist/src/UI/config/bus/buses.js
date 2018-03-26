"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const busFactory_1 = require("infra/shared/dependencyInjection/busFactory");
exports.default = (app) => {
    app.set('queryBus', busFactory_1.default.AppQueryBus);
    app.set('commandBus', busFactory_1.default.AppCommandBus);
};
//# sourceMappingURL=buses.js.map