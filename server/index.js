require('dotenv').config();
const fs                = require('fs');
const statistics        = require("./statistics");
const supermetricsAPI   = require("./supermetricsAPI");

const client_id = 'ju16a6m81mhid5ue1z3v2g0uh';
const email = 'your@email.address';
const name = 'Your Name';
let sl_token;
const jsonFilePath = '/home/arturas/IdeaProjects/supermetrics/server/supermetrics.json';

async function saveSupermetricsDataToJSONFile() {
    const requestToApiResult = await supermetricsAPI.connectToSupermetricsAPI( client_id, email, name );
    if ( requestToApiResult.status !== 200 )
    {
        console.log( "ERROR", requestToApiResult );
        return;
    }
    sl_token = requestToApiResult.data.sl_token;

    const posts = [];
    for ( let i = 1; i <= 10; i++ )
    {
        const supermetricsData = await supermetricsAPI.getDataFromSupermetricsAPI( sl_token, i );
        const p = supermetricsData.data.posts;
        posts.push( ...p );
    }
    console.log( posts );

    const jSonPosts = JSON.stringify( posts );
    fs.writeFile(jsonFilePath, jSonPosts, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });
}
// saveSupermetricsDataToJSONFile();

function supermetricsTaskImplementation() {
    const postsRawdata = fs.readFileSync(jsonFilePath);
    const posts = JSON.parse(postsRawdata);



    // return;

    // TASK
    // Show stats on the following:

    // a. - Average character length of posts per month
    console.log('#########################################################################');
    const average = statistics.averageCharactersLengthOfPostsPerMonthOldSchool( posts );
    console.log( 'Average character length of posts per month' );
    // console.log( average );
    const averageSQL = statistics.averageCharactersLengthOfPostsPerMonthSQL( posts );
    console.log( 'Average character length of posts per month SQL' );
    console.log( averageSQL );
    const average22 = statistics.averageCharactersLengthOfPostsPerMonth( posts );
    console.log( 'Average character length of posts per month 2' );
    console.log( average22 );

    // b. - Longest post by character length per month
    console.log('#########################################################################');
    const longestMessage = statistics.longestPostByCharacterLengthPerMonthOldSchool( posts );
    console.log( 'Longest post by character length per month' );
    console.log( longestMessage );
    const longestMessageSQL = statistics.longestPostByCharacterLengthPerMonthSQL( posts );
    console.log( 'Longest post by character length per month SQL' );
    console.log( longestMessageSQL );
    const longestMessage22 = statistics.longestPostByCharacterLengthPerMonth( posts );
    console.log( 'Longest post by character length per month 22' );
    console.log( longestMessage22 );

    // c. - Total posts split by week number
    console.log('#########################################################################');
    console.log( 'Total posts split by week number' );
    const weeksHashTable = statistics.totalPostsSplitByWeekNumberOldSchool( posts );
    console.log( weeksHashTable );
    console.log( 'Total posts split by week number SQL' );
    const weeksHashTableSQL = statistics.totalPostsSplitByWeekNumberSQL( posts );
    console.log( weeksHashTableSQL );
    console.log( 'Total posts split by week number 22' );
    const weeksHashTable22 = statistics.totalPostsSplitByWeekNumber( posts );
    console.log( weeksHashTable22 );

    // d. - Average number of posts per user per month
    console.log('#########################################################################');
    console.log( 'Average number of posts per user per month' );
    const average2 = statistics.averageNumberOfPostsPerUserPerMonthOldSchool( posts );
    console.log( average2 );
    const average2SQL = statistics.averageNumberOfPostsPerUserPerMonthSQL( posts );
    console.log( 'Average number of posts per user per month SQL' );
    console.log( average2SQL );
    const average222 = statistics.averageNumberOfPostsPerUserPerMonth( posts );
    console.log( 'Average number of posts per user per month 22' );
    console.log( average222 );
}
supermetricsTaskImplementation();

console.log( process.env.client_id );

