"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const express = require("express");
const dotenv = require("dotenv");
const serverDecorator_1 = require("./config/serverDecorator");
dotenv.config();
const app = express();
serverDecorator_1.default(app);
app.listen(app.get('port'), () => {
    util_1.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
});
exports.default = app;
//# sourceMappingURL=index.js.map