const session = require('express-session');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const knexSessionStore = require('connect-session-knex')(session);

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());


server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

sessionOptions = {
    name: "sprintCookie",
    secret: "mylittlesecret",
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 2, //Two minutes cookie
        secure: false
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore({
        knex: require('../database/dbConfig'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(session(sessionOptions));

server.get('/' , (req, res) => {
    res.send('<h1>Ernesto Pena => Authentication Sprint</h1>')
})


module.exports = server;
