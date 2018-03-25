import { Domain } from 'hollywood-js';

export default class UserWasCreated extends Domain.DomainEvent {
    constructor(public uuid: string, public email: string) {
        super();
    }
}