import { Domain } from 'hollywood-js';
import { CreateDocumentResponse } from 'elasticsearch';
import Elastic from '../elastic/elastic';

export default class EventsToElastic {
    constructor(private esCli: Elastic) {}

    send(event: Domain.DomainMessage): Promise<CreateDocumentResponse> {
        return this.esCli.create('events', event);
    }
}