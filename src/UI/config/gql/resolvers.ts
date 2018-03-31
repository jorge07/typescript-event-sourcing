import { Application } from 'hollywood-js'
import GetUserByUuidQuery from "application/query/user/getByUuid/getUserByUuidQuery";
import CreateUserCommand from "application/command/user/create/createUserCommand";
import { GraphQLError } from 'graphql';

const Resolvers = (queryBus: Application.QueryBus, commandBus: Application.CommandBus) => ({
    Query: {
        user: async (root, {uuid}) => {
            try {
                const {data} = await queryBus.handle(new GetUserByUuidQuery(uuid));

                return data;
            } catch (err) {

                return new GraphQLError("Not found")
            }

        },
    },
    Mutation: {
        createUser: (root, { uuid, email }) => {
            try {
                commandBus.handle(new CreateUserCommand(uuid, email));

                return 'ok';
            } catch (err) {

                return new GraphQLError(err.message)
            }
        }
    }
});

export default Resolvers;