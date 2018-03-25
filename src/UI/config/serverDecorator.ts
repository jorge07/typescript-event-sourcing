import { Express } from 'express';
import * as bodyParser from 'body-parser';
import config from './config'
import routingLoader from './routing/loader'
import busFactory from './bus/buses'
import ErrorHandling from './errorHandling';

export default (app: Express) => {
    app
        .set('port', config.PORT)

        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))      

    busFactory(app);
    routingLoader(app);
    
    app.use(ErrorHandling)
}