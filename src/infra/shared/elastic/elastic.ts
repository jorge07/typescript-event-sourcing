import { Client, PingParams, CreateDocumentParams, CreateDocumentResponse } from 'elasticsearch'
import { Domain } from 'hollywood-js';
import config from '../config'

const { ELASTIC_HOST, ELASTIC_LOGS } = config

export default class Elastic {
    private client: Client | null
    
    constructor() {
        this.connect()
    }
    
    private connect() {
        this.client = new Client({
            host: ELASTIC_HOST,
            log: ELASTIC_LOGS
        })
    }

    async create(index: string, event: Domain.DomainMessage): Promise<CreateDocumentResponse> {
        const response: CreateDocumentResponse = await this.client.index({
            index: index,
            type: index,
            id: event.uuid,
            body: event
        });

        return response
    }

    async healthz(): Promise<any> {
        return await this.client.ping(<PingParams>{});
    }
}
