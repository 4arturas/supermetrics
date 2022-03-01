const express           = require('express');
const { graphqlHTTP }   = require('express-graphql');
const cors              = require('cors');
const schema            = require('./schema');
const root              = require('./root')

const app               = express();
app.use( cors() );

app.use( '/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}) );

const APP_PORT = process.env.APP_PORT | 5001;
app.listen( APP_PORT, () => console.log( `Application is running on port ${APP_PORT}` ) );