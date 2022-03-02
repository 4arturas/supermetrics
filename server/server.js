require('dotenv').config();

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

app.get('/', function(req, res) {
    res.send('Hello World!')
});

const APP_PORT = process.env.APP_PORT;
console.log( APP_PORT );
app.listen( APP_PORT, () => console.log( `Application running on port ${APP_PORT}` ) );