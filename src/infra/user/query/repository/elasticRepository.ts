import Elastic from "infra/shared/elastic/elastic";
import GetUser from "domain/user/repository/query/getUser";
import User from "domain/user/model/user";

export default class UserElasticRepository implements GetUser {
    private readonly elasticCli: Elastic;

    constructor() {
        this.elasticCli = new Elastic();
    }

    async getUserByUuid(uuid: string): Promise<User> {
        return await this.elasticCli.find(
            'user',
            {
                match: {
                    uuid: uuid
                }
            },
            {
                size: 1
            }
        )
    }
}
