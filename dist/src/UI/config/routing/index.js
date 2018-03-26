"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("ui/controller/user");
exports.default = (app) => ({
    "get": {
        "/": (req, res) => res.json('ok'),
        "/users/:uuid": user_1.GetUser(app.get('queryBus'))
    },
    "post": {
        "/users": user_1.CreateUser(app.get('commandBus'))
    }
});
//# sourceMappingURL=index.js.map