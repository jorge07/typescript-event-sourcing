import { EventStore } from 'hollywood-js';
import Broker from '../broker/rabbitmq'
import RabbitMQPublisherEventListener from 'infra/shared/event/rabbitMQPublisherEventListener';

const Register = async (eventBus: EventStore.EventBus) => {
    await Broker.connect();
    eventBus
        .addListener(new RabbitMQPublisherEventListener(Broker))
};
export default Register;