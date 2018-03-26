import { log } from 'util';
import { Application, EventStore } from 'hollywood-js';
import CreateUserCommand from './createUserCommand';
import Email from 'domain/user/valueObject/email';
import User from 'domain/user/model/user';
import UserRepository from 'domain/user/repository/write/userRepository';
import ConflictError from 'domain/shared/error/conflictError';

export default class CreateUserHandler implements Application.ICommandHandler {
    constructor(private userRepository: UserRepository) {}

    handle(command: CreateUserCommand, success: Function, error: Function): void {        
        try {
            const userAlreadyExist = this.userRepository.load(command.uuid);
            
            log('User Already Exists')
            
            error(<Application.AppError>{
                message: 'User Already Exist',
                code: 409
            });
        } catch(err) {
            const user = User.create(
                command.uuid,
                command.email
            );

            this.userRepository.save(user);

            success(<Application.AppResponse>{
                data: 'ack'
            })
        }
    }
}