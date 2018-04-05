import { EventStore } from 'hollywood-js';
import Broker from '../broker/rabbitmq'
import RabbitMQPublisherEventListener from 'infra/shared/event/rabbitMQPublisherEventListener';
import UserSubscriber from "infra/user/query/subscriber/userSubscriber";
import UserWasCreated from "domain/user/event/userWasCreated";

const Register = async (eventBus: EventStore.EventBus) => {
    await Broker.connect();
    eventBus
        .attach(UserWasCreated, new UserSubscriber(Broker))
        .addListener(new RabbitMQPublisherEventListener(Broker))
    ;
};

export default Register;