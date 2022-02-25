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

app.listen( 5001, () => console.log( 'Application is running' ) );