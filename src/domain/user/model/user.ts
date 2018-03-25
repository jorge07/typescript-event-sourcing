import { Domain } from 'hollywood-js'
import UserWasCreated from '../event/userWasCreated';
import { default as Email, EmailType } from '../valueObject/email';

export default class User extends Domain.EventSourced {
    uuid: string;
    email: EmailType;
    createdAt: Date

    getAggregateRootId(): string {
        return this.uuid
    }

    static create(uuid: string, email: Email): User {
        const instance = new User();

        instance.raise(new UserWasCreated(uuid, email.value));

        return instance;
    }

    protected applyUserWasCreated(event: UserWasCreated): void {
        this.uuid = event.uuid
        this.email = event.email.toString();
        this.createdAt = event.ocurrendOn
    }
}