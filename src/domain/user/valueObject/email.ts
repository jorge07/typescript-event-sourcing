import InvalidArgumentError from '../../shared/error/invalidArgumentError';
export type EmailType = string;

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export default class Email {
    private regex: RegExp = new RegExp(emailRegex);
    public value: string;

    static fromString(rawEmail: string): Email {
        const instance = new Email();
        const err = instance.validate(rawEmail)

        if (err) {
            throw err
        }

        return instance;
    }

    private validate(value: string): void | InvalidArgumentError {
        if (! this.regex.test(value)) {
            return new InvalidArgumentError('Invalid Email: ' + value + ' ' + this.regex.test(value));
        }
        this.value = <EmailType> value;
    }

    public toString(): string {
        return this.value;
    }
}