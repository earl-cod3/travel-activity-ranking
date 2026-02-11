import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await server.listen({ port: 4000 });

  console.log(`🚀 Server ready at ${url}`);
}

startServer();
