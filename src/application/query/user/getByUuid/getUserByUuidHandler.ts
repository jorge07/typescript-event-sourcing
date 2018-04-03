import { Application } from 'hollywood-js';
import GetUserByUuidQuery from './getUserByUuidQuery';
import GetUser from "domain/user/repository/query/getUser";

export default class GetUserByUuidHandler implements Application.IQueryHandler {
    
    constructor(private readonly userStore: GetUser){}

    async handle(query: GetUserByUuidQuery): Promise<any> {
        try {
            return <Application.AppResponse>{
                data: await this.userStore.getUserByUuid(query.uuid)
            };

        } catch(err) {
            throw <Application.AppError>{message: err.message, code: 404}
        }
    }
}
