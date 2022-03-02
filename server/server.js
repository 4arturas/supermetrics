require('dotenv').config();

const express           = require('express');
const { graphqlHTTP }   = require('express-graphql');
const cors              = require('cors');
const schema            = require('./schema');
const root              = require('./root')
const path              = require("path");
const fs                = require("fs");

const app               = express();
app.use( cors() );

const APP_BUILD     = '../client/build';
const INDEX_HTML    = path.join(__dirname, APP_BUILD) + '/index.html';
const APP_ADDRESS   = process.env.APP_ADDRESS;
function replacePlaceholdersInFile(file) {
    const contents = fs.readFileSync(file, 'utf8')
        .replace(
            'http://localhost:5001',
            APP_ADDRESS
        );
    fs.writeFileSync(file, contents)
}
replacePlaceholdersInFile(INDEX_HTML);

app.use( '/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}) );

const sendIndexPage = async (req, res) => {
    res.sendFile(INDEX_HTML);
};

async function redirectIfNotAuthenticated(req, res, next) {
    return next();
}

app.use(redirectIfNotAuthenticated, express.static(path.join(__dirname, APP_BUILD)));
app.get('/', redirectIfNotAuthenticated, sendIndexPage);

const APP_PORT = process.env.APP_PORT;
console.log( APP_PORT );
app.listen( APP_PORT, () => console.log( `Application running on port ${APP_PORT}` ) );