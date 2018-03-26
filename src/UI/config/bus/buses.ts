import { Express } from 'express';
import Buses from 'infra/shared/dependencyInjection/busFactory';

export default (app: Express) => {
    app.set('queryBus', Buses.AppQueryBus);
    app.set('commandBus', Buses.AppCommandBus);
}