const resolvers = {
    Query: {
        getTest: () => {
            // ham xu li
            // db
            return {name:'admin', password: 'password'}
        },
    },
};

module.exports = resolvers
