import { Application } from 'hollywood-js';
import CreateUserCommand from './createUserCommand';
import User from 'domain/user/model/user';
import UserRepository from 'domain/user/repository/write/userRepository';
import GetUser from 'domain/user/repository/query/getUser';
import Email from 'domain/user/valueObject/email';

export default class CreateUserHandler implements Application.ICommandHandler {
    constructor(private userStore: GetUser, private userRepository: UserRepository, ) {}

    async handle(command: CreateUserCommand): Promise<void|Application.AppError> {
        await this.validateUuidAndEmail(command.uuid, command.email);

        const user = User.create(
            command.uuid,
            command.email
        );

        try {
            await this.userRepository.save(user);

            return;
        } catch (err){
            throw <Application.AppError>{
                message: err.message,
                code: 500
            };
        }
    }

    private async validateUuidAndEmail(uuid: string, email: Email): Promise<void> {
        let userExist: any = await this.userStore.getUserByUuid(uuid);
        this.failIfAlreadyExist(userExist);
        userExist = await this.userStore.getUserByEmail(email.value);
        this.failIfAlreadyExist(userExist);
    }

    private failIfAlreadyExist(check: any): void {
        if (check) {
            throw <Application.AppError>{
                message: 'Already Exist',
                code: 409
            };
        }
    }
}
