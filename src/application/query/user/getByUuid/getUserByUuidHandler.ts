import { Application } from 'hollywood-js';
import GetUserByUuidQuery from './getUserByUuidQuery';
import UserRepository from 'app.domain/user/repository/write/userRepository';

export default class GetUserByUuidHandler implements Application.IQueryHandler {
    constructor(private userStore: UserRepository){}

    async handle(query: GetUserByUuidQuery, success?: (resonse: Application.AppResponse)=>void, error?: (error: Application.AppError)=>void): Promise<any> {
        try {
            const user = await this.userStore.load(query.uuid);
            success(<Application.AppResponse>{data: user})
        } catch(err) {
            error(<Application.AppError>{message: err.message, code: 404})
        }
    }
}