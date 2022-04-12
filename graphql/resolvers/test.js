const resolvers = {
    Query: {
        getTest: () => {
            return {name:'admin', password: 'password'}
        },
    },
};

module.exports = resolvers
