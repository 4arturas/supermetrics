const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type LoginUser
    {
        status: String
        statusText: String 
        sl_token: String   
    }
    input LoginInput
    {
        client_id: String
        email: String
        name: String
    } 
    
    type Post
    {
        id: ID
        from_name: String
        from_id: String
        message: String
        type: String
        created_time: String
    }
    
    type Consent
    {
        id: ID
        name: String
        email: String
    } 
    input ConsentInput
    {
        name: String
        email: String
    } 
    
    type User
    {
        id: ID
        username: String
        age: Int
        posts: [Post]
    }    
    input UserInput
    {
        id: ID
        username: String!
        age: Int!
        posts: [PostInput]
    }
    input PostInput
    {
        id: ID
        title: String!
        content: String!
    }
    
    type AverageCharacterLengthOfPostsPerMonth
    {
         month: String
         averageCharacterLength: String   
    }
    
    type LongestPostByCharacterLengthPerMonth
    {
        month: String
        longestMessage: String   
    }
    
    type TotalPostsSplitByWeekNumber
    {
        week: String
        messagesCount: Int 
    }
    
    type AverageNumberOfPostsPerUserPerMonth
    {
        from_id: String  
        averagePerMonth: String    
    }
    
    type Query
    {       
        fetchSupermetricsPosts(sl_token: String): [Post] 
        generateRandomPosts: [Post] 
        averageCharactersLengthOfPostsPerMonth: [AverageCharacterLengthOfPostsPerMonth] 
        longestPostByCharacterLengthPerMonth: [LongestPostByCharacterLengthPerMonth] 
        totalPostsSplitByWeekNumber: [TotalPostsSplitByWeekNumber] 
        averageNumberOfPostsPerUserPerMonth: [AverageNumberOfPostsPerUserPerMonth] 
        getUser(id: ID): User
    }
    
    type Mutation 
    {
        loginUser(input: LoginInput): LoginUser
        giveConsent(input: ConsentInput): Consent
        createUser(input: UserInput): User
        testMutation(input: UserInput): Int
    }
`);

module.exports = schema;