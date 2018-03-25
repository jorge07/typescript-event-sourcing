import Broker from '../broker/rabbitmq'
import RabbitMQPublisherEventListener from '../../event/rabbitMQPublisherEventListener';
import { EventStore } from 'hollywood-js';

const Register = async (eventBus: EventStore.EventBus) => {
    await Broker.connect()
    eventBus
        .addListener(new RabbitMQPublisherEventListener(Broker))
}
export default Register;