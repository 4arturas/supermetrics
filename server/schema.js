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
    type Post
    {
        id: ID
        title: String
        content: String
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
    
    type Query
    {        
        getAllUsers: [User]
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