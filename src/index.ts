import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { createConnection } from 'typeorm';
import "reflect-metadata";
import { UserAPI } from './datasources/UserAPI';


async function start(): Promise<void> {
    const store = await createConnection();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => ({
            userAPI: new UserAPI(store)
        })
    });

    const serverInfo = await server.listen();

    console.log(`Server ready at ${serverInfo.url}`);
}

start();