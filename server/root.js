const supermetricsAPI   = require("./supermetricsAPI");
const randomPosts       = require("./randomPosts");
const statistics        = require("./statistics");

let postsDB = [];

const root = {
    loginUser: async ({input}) =>
    {
        const response = await supermetricsAPI.connectToSupermetricsAPI( input.client_id, input.email,  input.name );
        return { status: response.status, statusText: response.statusText, sl_token: response.data.sl_token };
    },
    fetchSupermetricsPosts: async ({sl_token}) =>
    {
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
        postsDB = randomPosts.generateRandomPosts();
        return postsDB;
    },
    averageCharactersLengthOfPostsPerMonth: () =>
    {
        return statistics.averageCharactersLengthOfPostsPerMonth( postsDB );
    },
    longestPostByCharacterLengthPerMonth: () =>
    {
        return statistics.longestPostByCharacterLengthPerMonth( postsDB );
    },
    totalPostsSplitByWeekNumber: () =>
    {
        return statistics.totalPostsSplitByWeekNumber( postsDB );
    },
    averageNumberOfPostsPerUserPerMonth: () =>
    {
        return statistics.averageNumberOfPostsPerUserPerMonth( postsDB );
    }
}

module.exports = root;