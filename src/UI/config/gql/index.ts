import schema from './schema'
import Resolvers from './resolvers'
import {Application} from "hollywood-js";
import { makeExecutableSchema } from "graphql-tools";

export default function ExecutableSchema(queryBus: Application.QueryBus, commandBus: Application.CommandBus) {
    return makeExecutableSchema({
        typeDefs: schema,
        resolvers: Resolvers(queryBus, commandBus)
    });
}