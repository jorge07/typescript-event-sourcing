import { Application, EventStore } from 'hollywood-js';
import CommandBus from 'application/commandBus';
import GetUserByUuidQuery from 'application/query/user/getByUuid/getUserByUuidQuery';
import GetUserByUuidHandler from 'application/query/user/getByUuid/getUserByUuidHandler';
import UserRepository from 'domain/user/repository/write/userRepository';
import CreateUserCommand from 'application/command/user/create/createUserCommand';
import CreateUserHandler from 'application/command/user/create/createUserHandler';
import RabbitMQPublisherEventListener from '../event/RabbitMQPublisherEventListener';
import userRepository from './repositories/userRepositoryFactory';
import { eventBus } from './eventStore/eventStore'
import Register from './eventListeners/registerListeners'

const newResolver = (): Application.HandlerResolver => (new Application.HandlerResolver()); 

const queryResolver =  newResolver();
const commandResolver = newResolver();

Register(eventBus);

queryResolver.addHandler(GetUserByUuidQuery, new GetUserByUuidHandler(userRepository));

commandResolver.addHandler(CreateUserCommand, new CreateUserHandler(userRepository));

const AppQueryBus = new Application.Bus(queryResolver);
const AppCommandBus = new CommandBus(commandResolver)

export default {
    AppQueryBus,
    AppCommandBus,
}
