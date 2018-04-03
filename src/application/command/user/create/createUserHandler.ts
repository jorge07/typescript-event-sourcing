import { Application } from 'hollywood-js';
import CreateUserCommand from './createUserCommand';
import User from 'domain/user/model/user';
import UserRepository from 'domain/user/repository/write/userRepository';

export default class CreateUserHandler implements Application.ICommandHandler {
    constructor(private userRepository: UserRepository) {}

    async handle(command: CreateUserCommand): Promise<void|Application.AppError> {
        try {
            // Check if exists
            await this.userRepository.load(command.uuid);

        } catch(err) {

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

        throw <Application.AppError>{
            message: 'Already Exist',
            code: 409
        };
    }
}
