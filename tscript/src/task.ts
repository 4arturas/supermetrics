import { AverageCharLengthOfPostsPerMonth, averageCharactersLengthOfPostsPerMonth } from "./averageCharactersLengthOfPostsPerMonth";
import { LongestPostByCharacterLengthPerMonth, longestPostByCharacterLengthPerMonth } from "./longestPostByCharacterLengthPerMonth";
import { TotalPostsSplitByWeekNumber, totalPostsSplitByWeekNumber} from "./totalPostsSplitByWeekNumber";
import { AverageNumberOfPostsPerUserPerMonth, averageNumberOfPostsPerUserPerMonth } from "./averageNumberOfPostsPerUserPerMonth";
import { connectToSupermetricsAPI, getDataFromSupermetricsAPI } from "./supermetricsAPI";

async function task() {
    const client_id: string = "ju16a6m81mhid5ue1z3v2g0uh"
    const email: string     = "your@email.address"
    const name: string      = "Your Name"

    const resp = await connectToSupermetricsAPI( client_id, email, name );

    const sl_token : string = resp.data.sl_token;
    console.log( 'Give me one second please' );

    // Fetch data
    const posts = [];
    for ( let i = 1; i <= 10; i++ ) {
        const supermetricsData = await getDataFromSupermetricsAPI( sl_token, i );
        const p = supermetricsData.data.posts;
        posts.push( ...p );
    }

    // TASK
    // Show stats on the following:

    // a. - Average character length of posts per month
    console.log('#########################################################################');
    console.log( 'Average character length of posts per month' );
    const averageCharLengthOfPostsPerMonth: Array<AverageCharLengthOfPostsPerMonth>  = averageCharactersLengthOfPostsPerMonth( posts );
    averageCharLengthOfPostsPerMonth.forEach( a => console.log( `{ month: "${a.month}", averageCharacterLength: ${a.averageCharacterLength} }`) );

    // b. - Longest post by character length per month
    console.log('#########################################################################');
    console.log( 'Longest post by character length per month' );
    const longestPostByCharLenPerMonth : Array<LongestPostByCharacterLengthPerMonth> = longestPostByCharacterLengthPerMonth( posts );
    longestPostByCharLenPerMonth.forEach( l => console.log( `{ month: "${l.month}", longestMessage: ${l.longestMessage} }` ) );

    // c. - Total posts split by week number
    console.log('#########################################################################');
    console.log( 'Total posts split by week number' );
    const totalPostsSplitByWeekNr : Array<TotalPostsSplitByWeekNumber> = totalPostsSplitByWeekNumber( posts );
    totalPostsSplitByWeekNr.forEach( t => console.log( `{ week: "${t.week}", messagesCount: ${t.messagesCount} }` ) )

    // d. - Average number of posts per user per month
    console.log('#########################################################################');
    console.log( 'Average number of posts per user per month' );
    const averageNrOfPostsPerUserPerMonth: Array<AverageNumberOfPostsPerUserPerMonth> = averageNumberOfPostsPerUserPerMonth( posts );
    averageNrOfPostsPerUserPerMonth.forEach( a => console.log( `{ from_id: "${a.from_id}", averagePerMonth: ${a.averagePerMonth} }` ) );
}
task();