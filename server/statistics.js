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
        const avg = { month: month, averageCharacterLength: monthData.totalMessagesLength/monthData.messageCount };
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
    longestMessages = alasql( 'SELECT month, MAX(messageLength) AS averageCharacterLength FROM ? GROUP BY month ORDER BY month', [longestMessages] );
    return longestMessages;
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
    const users =  Object.keys(usersHashMap);
    users.map( from_id => {
        const months = Object.keys( usersHashMap[from_id] );
        averages[from_id] = 0;
        months.map( monthNumber => {
            averages[from_id] += usersHashMap[from_id][monthNumber];
        });
        const totalNumberOfMonthsUserHasBeenPosting = months.length;
        averages[from_id] /= totalNumberOfMonthsUserHasBeenPosting;
    });
    return averages;
}

module.exports = {
    averageCharactersLengthOfPostsPerMonth,
    averageCharactersLengthOfPostsPerMonthSQL,
    longestPostByCharacterLengthPerMonth,
    longestPostByCharacterLengthPerMonthSQL,
    totalPostsSplitByWeekNumber,
    totalPostsSplitByWeekNumberSQL,
    averageNumberOfPostsPerUserPerMonth
};