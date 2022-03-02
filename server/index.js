require('dotenv').config();
const fs                = require('fs');
const statistics        = require("./statistics");
const supermetricsAPI   = require("./supermetricsAPI");

async function task() {
    const client_id     = process.env.client_id;
    const email         = process.env.email;
    const name          = process.env.name;

    // Login
    const requestToApiResult = await supermetricsAPI.connectToSupermetricsAPI( client_id, email, name );
    if ( requestToApiResult.status !== 200 )
    {
        console.log( "ERROR", requestToApiResult );
        return;
    }
    const sl_token      = requestToApiResult.data.sl_token;

    // Fetch data
    const posts = [];
    for ( let i = 1; i <= 10; i++ )
    {
        const supermetricsData = await supermetricsAPI.getDataFromSupermetricsAPI( sl_token, i );
        const p = supermetricsData.data.posts;
        posts.push( ...p );
    }

    // TASK
    // Show stats on the following:

    // a. - Average character length of posts per month
    console.log('#########################################################################');
    console.log( 'Average character length of posts per month' );
    const averageCharLengthOfPostsPerMonth = statistics.averageCharactersLengthOfPostsPerMonth( posts );
    console.log( averageCharLengthOfPostsPerMonth );

    // b. - Longest post by character length per month
    console.log('#########################################################################');
    console.log( 'Longest post by character length per month' );
    const longestPostByCharLenPerMonth = statistics.longestPostByCharacterLengthPerMonth( posts );
    console.log( longestPostByCharLenPerMonth );

    // c. - Total posts split by week number
    console.log('#########################################################################');
    console.log( 'Total posts split by week number' );
    const totalPostsSplitByWeekNr = statistics.totalPostsSplitByWeekNumber( posts );
    console.log( totalPostsSplitByWeekNr );

    // d. - Average number of posts per user per month
    console.log('#########################################################################');
    console.log( 'Average number of posts per user per month' );
    const averageNrOfPostsPerUserPerMonth = statistics.averageNumberOfPostsPerUserPerMonth( posts );
    console.log( averageNrOfPostsPerUserPerMonth );
}
task();

