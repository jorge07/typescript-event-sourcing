import { Application } from 'hollywood-js';
import GetUserByUuidQuery from './getUserByUuidQuery';
import UserRepository from 'domain/user/repository/write/userRepository';

export default class GetUserByUuidHandler implements Application.IQueryHandler {
    
    constructor(private readonly userStore: UserRepository){}

    async handle(query: GetUserByUuidQuery): Promise<any> {
        try {
            return <Application.AppResponse>{
                data: await this.userStore.load(query.uuid)
            };

        } catch(err) {
            throw <Application.AppError>{message: err.message, code: 404}
        }
    }
}
