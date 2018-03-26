"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    MESSAGE_BROKER: process.env.MESSAGE_BROKER || 'amqp://guest:guest@192.168.99.100:5672',
    ELASTIC_HOST: process.env.ELASTIC_HOST || '192.168.99.100:9200',
    ELASTIC_LOGS: process.env.ELASTIC_LOGS || 'trace'
};
//# sourceMappingURL=config.js.map