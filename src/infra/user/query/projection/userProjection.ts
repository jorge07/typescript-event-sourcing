import Elastic from "infra/shared/elastic/elastic";
import UserRepository from "domain/user/repository/write/userRepository";
import User from "domain/user/model/user";
import UserView from "domain/user/query/UserView";
import {log} from "util";

export default class UserProjectionFactory {
    private readonly elastic: Elastic;
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.elastic = new Elastic();
        this.userRepository = userRepository;
    }

    async generateUserProjection(uuid: string): Promise<void> {
        const user: any = await this.userRepository.load(uuid);

        this.elastic.add('user', uuid, UserProjectionFactory.userView(user)).catch(log);
    }

    private static userView(user: User | any): UserView {
        delete user['methodPrefix'];
        delete user['events'];

        return <UserView>user;
    }
}
