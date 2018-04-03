import {log} from "util";
import Email from "domain/user/valueObject/email";
import User from "domain/user/model/user";
import RedisStore from "infra/shared/store/redisStore";

const conn = new RedisStore('user');

const uuid: string = 'lol';

const r = async () => {
    const user = User.create(uuid, Email.fromString('lol@jose.com'));
    conn.append(uuid, user.getUncommitedEvents());
    const load = await conn.load(uuid);
    console.log(load);
    const userCreated = (new User).fromHistory(load);
    log(userCreated);
    log(userCreated.email);
    conn.close();
};

r();
