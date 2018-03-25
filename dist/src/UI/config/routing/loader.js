"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const index_1 = require("./index");
const importer = (app, routes, method) => {
    Object.keys(routes).forEach((key) => {
        switch (method) {
            case 'get':
                app.get(key, routes[key]);
                break;
            case 'post':
                app.post(key, routes[key]);
                break;
            case 'put':
                app.put(key, routes[key]);
                break;
            case 'delete':
                app.delete(key, routes[key]);
                break;
            default:
                break;
        }
        util_1.log("Imported Route " + method.toUpperCase() + " " + key);
    });
};
exports.default = (app) => {
    const routes = index_1.default(app);
    Object.keys(routes).forEach((method) => importer(app, routes[method], method));
};
//# sourceMappingURL=loader.js.map