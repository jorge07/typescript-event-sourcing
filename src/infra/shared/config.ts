export default {
    MESSAGE_BROKER: process.env.MESSAGE_BROKER || 'amqp://guest:guest@192.168.99.100:5672',
    ELASTIC_HOST: process.env.ELASTIC_HOST || '192.168.99.100:9200',
    ELASTIC_LOGS: process.env.ELASTIC_LOGS || 'error',
    REDIS_HOST: process.env.REDIS_HOST || '192.168.99.100',
    REDIS_PORT: process.env.REDIS_PORT || '6379'
}
