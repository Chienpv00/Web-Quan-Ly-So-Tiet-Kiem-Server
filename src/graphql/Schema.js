const { readdirSync, readFileSync } = require('fs');
const { join } = require('path');
const {makeExecutableSchema} = require('@graphql-tools/schema');
const gqlFiles = readdirSync(join(__dirname, './typedefs'));
const resolvers = require('./resolvers/index');

let typeDefs = '';

gqlFiles.forEach((file) => {
    typeDefs += readFileSync(join(__dirname, './typedefs', file), { encoding: 'utf-8' });
});

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

module.exports = schema
