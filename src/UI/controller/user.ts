import { Application } from 'hollywood-js';
import CreateUserCommand from 'application/command/user/create/createUserCommand';
import GetUserByUuidQuery from 'application/query/user/getByUuid/GetUserByUuidQuery';

export const CreateUser = (commandBus: Application.CommandBus) => async (req, res, next) => {
    const { uuid, email } = req.body;
    try {
        await commandBus.handle(new CreateUserCommand(uuid, email));
        res.json().status(201);
    } catch (err) {
        next(err)
    }
};

export const GetUser = (queryBus: Application.QueryBus) => async (req, res, next) => {
    try {
        const response: any = await queryBus.handle(new GetUserByUuidQuery(req.params.uuid));
        
        return res.json(response.data)
    } catch (err) {
        next(err)
    }
};
