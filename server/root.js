const supermetricsAPI   = require("./supermetricsAPI");

const users = [
    { id: 1, username: 'TestUser', age: 33 }
];

const consents = [
    { id: 1, name: 'TestUser', email: 'test@test.com' }
];

const root = {
    loginUser: async ({input}) =>
    {
        const response = await supermetricsAPI.connectToSupermetricsAPI( input.client_id, input.email,  input.name );
        console.log( response );
        return { status: response.status, statusText: response.statusText, sl_token: response.data.sl_token };
    },

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