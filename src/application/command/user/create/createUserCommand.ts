import { Application } from 'hollywood-js'
import Email from 'domain/user/valueObject/email';

export default class CreateUserCommand implements Application.ICommand {
    public readonly email: Email;
    constructor(public uuid: string, email: string){
        this.email = Email.fromString(email);
    }
}