import InvalidArgumentError from 'domain/shared/error/invalidArgumentError';

export type EmailType = string;

export default class Email {
    private regex: RegExp = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
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