const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const db = require('../database/dbUsers')

const authRouter = require('../auth/auth-router.js');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());


const knexSessionStore = require('connect-session-knex')(session);

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
server.use('/api/auth', authRouter);

server.get('/' , (req, res) => {
    res.status(200).json({Ernesto_Pena: '=> Authentication Sprint'})
})

server.get('/users', async (req,res) => {
    try {
        const getall = await db.find();
      res.status(200).json(getall);
    }
    catch (err) {
      res.status(500).json(err.message)
    }
  })


module.exports = server;
