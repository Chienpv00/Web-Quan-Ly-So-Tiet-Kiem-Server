const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const app = require('./app');
const Database = require('./dataSources/index');
const db = require('./config/db');
const schema = require('./graphql/Schema');
require('dotenv').config();

const PORT = process.env.PORT;

const apolloServer = async (schema,  Database) => {
    const httpServer = http.createServer(app);

    const logdb = await new Promise((resolve, reject) => {
        db.connect((err) => {
            if (err) reject(err);
            resolve('Connected!');
        });
    });

    console.log(logdb);

    const server = new ApolloServer({
        schema,
        dataSources: () => {
            return {
                database: new Database(),
            };
        },
    });

    await server.start();
    server.applyMiddleware({ app });
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
};

apolloServer(schema, Database);
