import { Express } from 'express';
import * as bodyParser from 'body-parser';
import config from './config'
import routingLoader from './routing/loader'
import busFactory from './bus/buses'
import ErrorHandling from './errorHandling';
import ExecutableSchema from './gql'

const {graphqlExpress, graphiqlExpress} = require('apollo-server-express'); // what a shit

export default (app: Express) => {
    busFactory(app);

    app
        .set('port', config.PORT)

        // bodyParser is needed just for POST.
        .use('/graphql', bodyParser.json(), graphqlExpress({ schema: ExecutableSchema(app.get('queryBus'), app.get('commandBus'))}))
        // if you want GraphiQL enabled
        .get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
    ;

    routingLoader(app);
    
    app.use(ErrorHandling)
}