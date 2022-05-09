const customerMutations = require('./customer/mutations');
const productMutations = require('./product/mutations');
const userMutations = require('./user/mutations');

const userQueries = require('./user/queries');
const productQueries = require('./product/queries');
const customerQueries = require('./customer/queries');

const resolvers = {
    Query: {
        ...userQueries,
        ...productQueries,
        ...customerQueries
    },

    Mutation: {
        ...userMutations,
        ...productMutations,
        ...customerMutations
    },
};

module.exports = resolvers;
