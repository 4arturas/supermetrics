const supermetricsAPI   = require("./supermetricsAPI");
const randomPosts       = require("./randomPosts");
const statistics        = require("./statistics");

let postsDB = [];

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

    fetchSupermetricsPosts: async ({sl_token}) =>
    {
        console.log( 'fetchSupermetricsPosts', sl_token );
        const posts = [];
        for ( let i = 1; i <= 10; i++ )
        {
            const supermetricsData = await supermetricsAPI.getDataFromSupermetricsAPI( sl_token, i );
            const p = supermetricsData.data.posts;
            posts.push( ...p );
        }
        postsDB = posts;
        return postsDB;
    },
    generateRandomPosts: () =>
    {
        console.log( 'generateRandomPosts' );
        postsDB = randomPosts.generateRandomPosts();
        return postsDB;
    },
    averageCharactersLengthOfPostsPerMonth: () =>
    {
        return statistics.averageCharactersLengthOfPostsPerMonthSQL( postsDB );
    },
    longestPostByCharacterLengthPerMonth: () =>
    {
        return statistics.longestPostByCharacterLengthPerMonthSQL( postsDB );
    },
    totalPostsSplitByWeekNumber: () =>
    {
        return statistics.totalPostsSplitByWeekNumberSQL( postsDB );
    },
    averageNumberOfPostsPerUserPerMonth: () =>
    {
        return statistics.averageNumberOfPostsPerUserPerMonthSQL( postsDB );
    },

    getUser: ({id}) =>
    {
        // return users[0];
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