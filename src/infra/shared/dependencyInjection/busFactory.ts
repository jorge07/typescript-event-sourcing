import { Application } from 'hollywood-js';
import GetUserByUuidQuery from 'application/query/user/getByUuid/getUserByUuidQuery';
import GetUserByUuidHandler from 'application/query/user/getByUuid/getUserByUuidHandler';
import CreateUserCommand from 'application/command/user/create/createUserCommand';
import CreateUserHandler from 'application/command/user/create/createUserHandler';
import userRepository from './repositories/userRepositoryFactory';
import { eventBus } from './eventStore/eventStore'
import Register from './eventListeners/registerListeners'
import { getUser } from "infra/shared/dependencyInjection/repositories/userRepositoryFactory";

const commandResolver = new Application.CommandHandlerResolver();
const queryResolver =  new Application.QueryHandlerResolver();

Register(eventBus);

queryResolver.addHandler(GetUserByUuidQuery, new GetUserByUuidHandler(getUser));

commandResolver.addHandler(CreateUserCommand, new CreateUserHandler(getUser, userRepository));

const AppQueryBus = new Application.QueryBus(queryResolver);
const AppCommandBus = new Application.CommandBus(commandResolver);

export default {
    AppQueryBus,
    AppCommandBus,
}
