import User from "domain/user/model/user";

export default interface GetUser {
    getUserByUuid(uuid: string): Promise<User>;
}