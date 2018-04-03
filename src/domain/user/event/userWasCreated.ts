import { Domain } from 'hollywood-js';
import { EmailType } from "domain/user/valueObject/email";

export default class UserWasCreated extends Domain.DomainEvent {
    constructor(public uuid: string, public email: EmailType) {
        super();
    }
}
