const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const app = require("./app");
const typeDefs = require('./graphql/typedefs/index')
const resolvers = require('./graphql/resolvers/test')

require("dotenv").config();

const PORT = process.env.PORT;

const apolloServer = async (typeDefs, resolvers) => {
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs, resolvers
    });

    await server.start();
    server.applyMiddleware({ app });
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
};

apolloServer(typeDefs, resolvers);
