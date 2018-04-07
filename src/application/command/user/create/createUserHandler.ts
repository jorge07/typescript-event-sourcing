import { Application, EventStore } from 'hollywood-js';
import CreateUserCommand from './createUserCommand';
import User from 'domain/user/model/user';
import GetUser from 'domain/user/repository/query/getUser';
import Email from 'domain/user/valueObject/email';
import UserView from "domain/user/query/UserView";

export default class CreateUserHandler implements Application.ICommandHandler {
    constructor(private userStore: GetUser, private userRepository: EventStore.EventStore<User>, ) {}

    async handle(command: CreateUserCommand): Promise<void|Application.IAppError> {
        try {

            await this.validateUuidAndEmail(command.uuid, command.email);

            const user = User.create(
                command.uuid,
                command.email
            );

            try {
                await this.userRepository.save(user);

            } catch (err){
                throw <Application.IAppError>{
                    message: err.message,
                    code: 500
                };
            }
        } catch (err) {
            console.log(err);
            throw err;
        }

    }

    private async validateUuidAndEmail(uuid: string, email: Email): Promise<void> {
        let userExist: any;

        try {
            userExist = await this.userStore.getUserByUuid(uuid);
        } catch (err){
            throw <Application.IAppError>{
                message: err.message,
                code: 500
            };
        }

        CreateUserHandler.failIfAlreadyExist(userExist);

        try {
            userExist = await this.userStore.getUserByEmail(email.value);
        } catch (err){
            throw <Application.IAppError>{
                message: err.message,
                code: 500
            };
        }

        CreateUserHandler.failIfAlreadyExist(userExist);
    }

    private static failIfAlreadyExist(check: UserView|null): void {
        if (null !== check) {
            throw <Application.IAppError>{
                message: 'Already Exist',
                code: 409
            };
        }
    }
}
