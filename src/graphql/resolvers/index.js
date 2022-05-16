const customerMutations = require('./customer/mutations');
const productMutations = require('./product/mutations.js');
// import productMutations from ('./product/mutations.mjs')
const userMutations = require('./user/mutations');

const userQueries = require('./user/queries');
const productQueries = require('./product/queries');
const customerQueries = require('./customer/queries');

const productFields = require('./product/fields')

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

    ...productFields
};

module.exports = resolvers;
