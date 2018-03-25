import { Application } from 'hollywood-js';
export default class GetUserByUuidQuery implements Application.IQuery {
    constructor(public uuid: string) {}
}