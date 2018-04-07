import {EventStore} from 'hollywood-js'
import {log} from "util";
import Elastic from "infra/shared/elastic/elastic";
import User from "domain/user/model/user";
import UserView from "domain/user/query/UserView";

export default class UserProjectionFactory {
    private readonly elastic: Elastic;
    private readonly userRepository: EventStore.EventStore<User>;

    constructor(userRepository: EventStore.EventStore<User>) {
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
