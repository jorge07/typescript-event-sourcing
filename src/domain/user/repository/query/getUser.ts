import UserView from "domain/user/query/UserView";
import {EmailType} from "domain/user/valueObject/email";

export default interface GetUser {
    getUserByUuid(uuid: string): Promise<UserView|null>;
    getUserByEmail(email: EmailType): Promise<UserView|null>;
}