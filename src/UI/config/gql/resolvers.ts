import { Application } from 'hollywood-js'
import { GraphQLError } from 'graphql';
import GetUserByUuidQuery from "application/query/user/getByUuid/getUserByUuidQuery";
import CreateUserCommand from "application/command/user/create/createUserCommand";

const Resolvers = (queryBus: Application.QueryBus, commandBus: Application.CommandBus) => ({
    Query: {
        user: async (root, {uuid}) => {
            try {
                const res: any = await queryBus.ask(new GetUserByUuidQuery(uuid));

                return res.data;
            } catch (err) {

                return new GraphQLError("Not found")
            }

        },
    },
    Mutation: {
        createUser: async (root, { uuid, email }) => {
            try {
                await commandBus.handle(new CreateUserCommand(uuid, email));
                return 'ok';
            } catch (err) {

                return new GraphQLError(err.message)
            }
        }
    }
});

export default Resolvers;