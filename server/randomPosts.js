const { faker } = require('@faker-js/faker');
const moment = require("moment");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function createPost( id, from_name, from_id, message, type, created_time )
{
    return { id: id, from_name: from_name, from_id: from_id, message: message, type: type, created_time: created_time };
}

function generateRandomPosts()
{
    const randomUsersArray = [];
    const randomUsersNumber = getRandomInt( 10, 15 );
    for ( let i = 0; i < randomUsersNumber; i++ )
    {
        const randomUserId  = getRandomInt( 100, 1000 );
        const randomName    = faker.name.findName();
        const user          = { from_id: 'user_' + randomUserId, from_name: randomName };
        randomUsersArray.push( user );
    } // end for i

    const randomPosts = [];
    for ( let postId = 0; postId < 10; postId++ )
    {
        const randomUserId              = getRandomInt( 0 , randomUsersNumber );
        const randomUser                = randomUsersArray[randomUserId];
        const randomSentencesNumber     = getRandomInt( 1, 5 );
        const message                   = lorem.generateSentences(randomSentencesNumber);
        const randomDate                = moment(new Date(+(new Date()) - Math.floor(Math.random()*100000000000))).format('YYYY-MM-DD[T]HH:mm:ss');
        const post                      = createPost( 'post'+postId, randomUser.from_name, randomUser.from_id, message,'status', randomDate );
        randomPosts.push( post );
    } // end for postId
    return randomPosts;
}

module.exports = {
    generateRandomPosts
};