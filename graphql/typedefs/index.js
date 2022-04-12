const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Query {
        getTest: Test
    }

    type Test {
        name: String!
        password: String!
    }
`;

module.exports = typeDefs