import { Application } from 'hollywood-js';
import CreateUserCommand from 'application/command/user/create/createUserCommand';
import GetUserByUuidQuery from 'application/query/user/getByUuid/GetUserByUuidQuery';
import InvalidArgumentError from 'domain/shared/error/invalidArgumentError';
import CommandBus from 'application/commandBus';

export const CreateUser = (commandBus: CommandBus) => (req, res, next) => {
    const { uuid, email } = req.body;
    commandBus.handle(
        new CreateUserCommand(uuid, email), 
        (appResponse) => (res.json(appResponse)), 
        (errResponse) => (next(errResponse))
    );
}

export const GetUser = (queryBus: Application.Bus) => (req, res, next) => {
    queryBus.handle(
        new GetUserByUuidQuery(req.params.uuid), 
        (response: Application.AppResponse) => {
            res.json(response.data)
        },
        next
    );
} 