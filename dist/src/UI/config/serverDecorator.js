"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const config_1 = require("./config");
const loader_1 = require("./routing/loader");
const buses_1 = require("./bus/buses");
const errorHandling_1 = require("./errorHandling");
exports.default = (app) => {
    app
        .set('port', config_1.default.PORT)
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }));
    buses_1.default(app);
    loader_1.default(app);
    app.use(errorHandling_1.default);
};
//# sourceMappingURL=serverDecorator.js.map