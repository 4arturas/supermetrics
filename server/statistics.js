const moment = require("moment");
const alasql = require("alasql");

/* Average character length of posts per month */
function averageCharactersLengthOfPostsPerMonth( posts )
{
    const months = {};
    for ( let i = 0; i < posts.length; i++ )
    {
        const post              = posts[i];
        const month             = moment(post.created_time).format(`YYYY-MM`);
        if ( !months[month] )
            months[month] = {messageCount: 0, totalMessagesLength: 0 };
        months[month].messageCount++;
        months[month].totalMessagesLength += post.message.length;
    } // end for i
    const averages = [];
    const monthNameArray =  Object.keys(months);
    for ( let i = 0; i < monthNameArray.length; i++ )
    {
        const month = monthNameArray[i];
        const monthData = months[month];
        const avg = { month: month, averageCharacterLength: monthData.totalMessagesLength / monthData.messageCount };
        averages.push( avg );
    } // end for i
    return averages;
}
function averageCharactersLengthOfPostsPerMonthSQL( posts )
{
    // id, from_name, from_id, message, type, created_time
    // const res = alasql('SELECT a, SUM(b) AS b FROM ? GROUP BY a',[posts]);
    alasql.fn.messageLength = function(message) {
        return message.length;
    };
    alasql.fn.converteCreatedTimeToYYYYMMM = function(created_time) {
        return moment(created_time).format(`YYYY-MM`);
    };
    let averages = alasql('SELECT messageLength(message) AS messageLength, converteCreatedTimeToYYYYMMM(created_time) as month FROM ?', [posts]);
    averages = alasql( 'SELECT month, AVG(messageLength) AS averageCharacterLength FROM ? GROUP BY month ORDER BY month', [averages] );
    // const res = alasql('SELECT avg(message) FROM ?',[posts]);
    return averages;
}
function averageCharactersLengthOfPostsPerMonth22( posts )
{
    const totalCharactersLengthPerMonth = posts.reduce( (acc, post) => {
        let month = moment(post.created_time).format('YYYY-MM');
        if (!acc[month])
            acc[month] = [];
        acc[month].push(post.message.length);
        return acc;
    }, {} );

    return Object.keys( totalCharactersLengthPerMonth )
        .map( ( month ) => {
            return {
                month: month,
                averageCharacterLength: totalCharactersLengthPerMonth[month].reduce( ( previous, current ) => previous + current , 0 ) / totalCharactersLengthPerMonth[month].length }
        } );
}
/* Longest post by character length per month */
function longestPostByCharacterLengthPerMonth( posts )
{
    const months = {};
    for ( let i = 0; i < posts.length; i++ )
    {
        const post              = posts[i];
        const month             = moment(post.created_time).format(`YYYY-MM`);
        if ( !months[month] )
            months[month] = -1;
        if ( post.message.length > months[month] )
            months[month] = post.message.length;
    } // end for i
    const longestArray = [];
    const monthNameArray =  Object.keys(months);
    for ( let i = 0; i < monthNameArray.length; i++ )
    {
        const month = monthNameArray[i];
        const longest = { month: month, longestMessage: months[month] };
        longestArray.push( longest );
    } // end for i
    return longestArray;
}
function longestPostByCharacterLengthPerMonthSQL( posts )
{
    alasql.fn.messageLength = function(message) {
        return message.length;
    };
    alasql.fn.converteCreatedTimeToYYYYMMM = function(created_time) {
        return moment(created_time).format(`YYYY-MM`);
    };
    let longestMessages = alasql('SELECT messageLength(message) AS messageLength, converteCreatedTimeToYYYYMMM(created_time) as month FROM ?', [posts]);
    longestMessages = alasql( 'SELECT month, MAX(messageLength) AS longestMessage FROM ? GROUP BY month ORDER BY month', [longestMessages] );
    return longestMessages;
}
function longestPostByCharacterLengthPerMonth22( posts )
{
    const longestMessageLengthPerMonth = posts.reduce( (acc, post) => {
        const month = moment(post.created_time).format('YYYY-MM');
        if (!acc[month])
            acc[month] = -1;

        if ( post.message.length > acc[month] )
            acc[month] = post.message.length;

        return acc;
    }, {} );
    return Object.keys(longestMessageLengthPerMonth)
        .map( month => {
            return {
                month: month,
                longestMessage: longestMessageLengthPerMonth[month] }
        } );
}
/* Total posts split by week number*/
function totalPostsSplitByWeekNumber( posts )
{
    const weeksHashTable = {};
    posts.map( post => {

        const created_time = post.created_time;
        const date = moment(created_time, 'YYYY-MM-DD[T]HH:mm:ss');
        const year = date.year();
        const weekNumber = date.week();
        const keyYearWeekNumber = year + '-' + weekNumber;
        const weekExistsInHashTable = weeksHashTable[keyYearWeekNumber];
        if ( !weekExistsInHashTable )
            weeksHashTable[keyYearWeekNumber] = 0;
        weeksHashTable[keyYearWeekNumber]++;
    } );
    const weeksArray = [];
    const weekKeys =  Object.keys(weeksHashTable);
    for ( let i = 0; i < weekKeys.length; i++ )
    {
        const week = weekKeys[i];
        const weekJson = { week: week, messagesCount: weeksHashTable[week] };
        weeksArray.push( weekJson );
    } // end for i
    return weeksArray;
}
function totalPostsSplitByWeekNumberSQL( posts )
{
    alasql.fn.converteCreatedTimeToYYYYWeek = function(created_time) {
        const date = moment(created_time, 'YYYY-MM-DD[T]HH:mm:ss');
        const year = date.year();
        const weekNumber = date.week();
        return year + '-' + weekNumber;
    };
    let ret = alasql('SELECT message, converteCreatedTimeToYYYYWeek(created_time) as week FROM ?', [posts]);
    ret = alasql( 'SELECT week, count(message) AS messagesCount FROM ? GROUP BY week ORDER BY week', [ret] );
    return ret;
}
function totalPostsSplitByWeekNumber22( posts )
{
    const totalPostsByWeek = posts.reduce( (acc, post) => {
        const date = moment(post.created_time, 'YYYY-MM-DD[T]HH:mm:ss');
        const year = date.year();
        const weekNumber = date.week();
        const keyYearWeekNumber = year + '-' + weekNumber;
        if (!acc[keyYearWeekNumber])
            acc[keyYearWeekNumber] = 0;

        acc[keyYearWeekNumber]++;

        return acc;
    }, {} );
    return Object.keys(totalPostsByWeek).map( week => {
        return { week: week, messagesCount: totalPostsByWeek[week] }
    } );
}
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
/* Average number of posts per user per month */
function averageNumberOfPostsPerUserPerMonth( posts )
{
    // After data analysis I see that there is only data for February, but lets do what is said in the task
    // Hashtable for user->month->postNumber
    const usersHashMap = {};
    let totalMonths = 0;
    posts.map( post => {
        const from_id       = post.from_id;
        const created_time  = post.created_time;
        const monthNumber   = moment(created_time, "YYYY-MM-DD[T]HH:mm:ss").month();

        const userHashMap   = usersHashMap[from_id];
        if ( !userHashMap )
            usersHashMap[from_id] = {}

        const postsPerMonthHashMap = usersHashMap[from_id][monthNumber];
        if ( !postsPerMonthHashMap )
        {
            usersHashMap[from_id][monthNumber] = 0;
            totalMonths++;
        }
        usersHashMap[from_id][monthNumber]++;
    } );

    const averages = {};
    const averagesArr = [];
    const users =  Object.keys(usersHashMap);
    users.map( from_id => {
        const months = Object.keys( usersHashMap[from_id] );
        const uuu = { from_id: from_id, averagePerMonth: 0 };
        averages[from_id] = 0;
        months.map( monthNumber => {
            averages[from_id] += usersHashMap[from_id][monthNumber];
            uuu.averagePerMonth += usersHashMap[from_id][monthNumber];
        });
        const totalNumberOfMonthsUserHasBeenPosting = months.length;
        averages[from_id] /= totalNumberOfMonthsUserHasBeenPosting;
        uuu.averagePerMonth /= totalNumberOfMonthsUserHasBeenPosting;
        averagesArr.push( uuu );
    });
    // return averages;
    return averagesArr;
}
function averageNumberOfPostsPerUserPerMonthSQL( posts )
{
    alasql.fn.converteCreatedTimeToYYYYMMM = function(created_time) {
        return moment(created_time).format(`YYYY-MM`);
    };

    let averageMessagesPerUserPerMonth = alasql('SELECT from_id, message, converteCreatedTimeToYYYYMMM(created_time) as month FROM ?', [posts]);
    averageMessagesPerUserPerMonth = alasql('SELECT from_id, COUNT(message) AS messageCount, month FROM ? GROUP BY from_id, month', [averageMessagesPerUserPerMonth]);
    averageMessagesPerUserPerMonth = alasql('SELECT from_id, SUM(messageCount)/COUNT(month) AS averagePerMonth FROM ? GROUP BY from_id ORDER BY from_id', [averageMessagesPerUserPerMonth]);

    return averageMessagesPerUserPerMonth;
}
function averageNumberOfPostsPerUserPerMonth22( posts )
{
    const postsPerUser = posts.reduce( (acc, post) => {
        const key = post.from_id;
        if (!acc[key])
            acc[key] = [];

        acc[key].push( post.created_time );

        return acc;
    }, {} );


    const postsPerUserPerMonth = Object.keys( postsPerUser ).map( from_id => {
        return {
            from_id: from_id,
            postsPerMonth: postsPerUser[from_id].reduce( (acc,created_time) => {
                const month = moment(created_time).format('YYYY-MM');
                if ( !acc[month] )
                    acc[month] = 0;
                acc[month]++;
                return acc;
            }, {} ) };
    });

    function avg( posts ) {
        return posts.reduce( (previous, current) => previous+current, 0 ) / posts.length;
    }

    return postsPerUserPerMonth.map( ( e ) => {
       return {
           from_id: e.from_id,
           averagePerMonth:  avg( Object.keys(e.postsPerMonth).map( month => { return e.postsPerMonth[month] } ) )
       }
    });
}
module.exports = {
    averageCharactersLengthOfPostsPerMonth,
    averageCharactersLengthOfPostsPerMonthSQL,
    averageCharactersLengthOfPostsPerMonth22,
    longestPostByCharacterLengthPerMonth,
    longestPostByCharacterLengthPerMonthSQL,
    longestPostByCharacterLengthPerMonth22,
    totalPostsSplitByWeekNumber,
    totalPostsSplitByWeekNumberSQL,
    totalPostsSplitByWeekNumber22,
    averageNumberOfPostsPerUserPerMonth,
    averageNumberOfPostsPerUserPerMonthSQL,
    averageNumberOfPostsPerUserPerMonth22
};