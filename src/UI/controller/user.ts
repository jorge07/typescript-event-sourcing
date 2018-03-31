import { Application } from 'hollywood-js';
import CreateUserCommand from 'application/command/user/create/createUserCommand';
import GetUserByUuidQuery from 'application/query/user/getByUuid/GetUserByUuidQuery';

export const CreateUser = (commandBus: Application.CommandBus) => (req, res, next) => {
    const { uuid, email } = req.body;
    commandBus.handle(
        new CreateUserCommand(uuid, email), 
        (appResponse) => (res.json(appResponse)), 
        (errResponse) => (next(errResponse))
    );
};

export const GetUser = (queryBus: Application.QueryBus) => async (req, res, next) => {
    try {
        const response: Application.AppResponse = await queryBus.handle(new GetUserByUuidQuery(req.params.uuid));
        
        return res.json(response.data)
    } catch (err) {
        next(err)
    }
};
