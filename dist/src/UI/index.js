"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const serverDecorator_1 = require("./config/serverDecorator");
dotenv.config();
const app = express();
serverDecorator_1.default(app);
app.listen(app.get('port'), () => {
    console.log(('App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
});
exports.default = app;
//# sourceMappingURL=index.js.map