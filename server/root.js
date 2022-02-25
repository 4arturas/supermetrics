const users = [
    { id: 1, username: 'TestUser', age: 33 }
];

const consents = [
    { id: 1, name: 'TestUser', email: 'test@test.com' }
];

const root = {
    giveConsent: ({input}) =>
    {
        const id = Date.now();
        const consent =
            {
                id, ...input
            };
        consents.push( consent );
        return 1;
    },

    getAllUsers: () =>
    {
        return users;
    },
    getUser: ({id}) =>
    {
        return users.find( (user) => user.id === id );
    },
    createUser: ({input}) =>
    {
        const id = Date.now();
        const user =
        {
            id, ...input
        };
        users.push( user );
        return user;
    },
    testMutation: () =>
    {
        return 1;
    }
}

module.exports = root;