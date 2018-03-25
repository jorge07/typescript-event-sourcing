import { log } from 'util';
import { Domain } from 'hollywood-js';
import Elastic from '../elastic/elastic';
import { CreateDocumentResponse } from 'elasticsearch';

export default class EventsToElastic {
    constructor(private esCli: Elastic) {
    }

    send(event: Domain.DomainMessage): Promise<CreateDocumentResponse> {
        return this.esCli.create('events', event);
    }
}