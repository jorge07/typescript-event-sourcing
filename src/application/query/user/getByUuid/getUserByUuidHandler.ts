import { Application } from 'hollywood-js';
import GetUserByUuidQuery from './getUserByUuidQuery';
import UserRepository from 'domain/user/repository/write/userRepository';

export default class GetUserByUuidHandler implements Application.IQueryHandler {
    constructor(private readonly userStore: UserRepository){}

    async handle(query: GetUserByUuidQuery, success?: (resonse: Application.AppResponse)=>void, error?: (error: Application.AppError)=>void): Promise<any> {
        try {
            const user = await this.userStore.load(query.uuid);
            success(<Application.AppResponse>{data: user})
        } catch(err) {
            error(<Application.AppError>{message: err.message, code: 404})
        }
    }
}
