const request = require('supertest');
require('dotenv').config();
const server = require('./server');
const db = require('../database/dbUsers')
const knexDB = require('../database/dbConfig')
const authenticate = require('../auth/authenticate-middleware');

describe('server.js', () => {
    it('should set the testing enviroment ', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
})


describe('GET /', () => {

    it('should return 200 ok', async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
        })   


    it('should return a json object', async () =>{
        const res = await request(server).get('/users');
        expect(res.type).toBe('application/json');
    })


    it('should return {Ernesto_Pena: => Authentication Sprint}', async () => {
        const res = await request(server).get('/');
        expect(res.body).toEqual({Ernesto_Pena: '=> Authentication Sprint'});
    })

})

describe('POST/', () => {
    beforeEach(async () => {
        await knexDB('users').truncate();
    })
    //TEST 
    it('should insert four new user}', async () => {
        await db.add({username:'Ernesto', password: 'thispassword'});
        await db.add({username: 'Daniel', password: 'thatpassword'});

        const users = await knexDB('users');
        expect(users).toHaveLength(2);
    })

    //TEST FOR HASH
    // it('should test verify user', async () => {
    //     await knexDB('users').truncate(); //trunking that table

    //     //Declaring the mock request object
    //     reqOptions ={
    //         body: {
    //             username:"Ernesto",
    //             password:"password123"
    //         }
    //     }
    //     //Declaring the res mocking object
    //     resOptions ={
    //         body: {
    //             username:"Ernesto",
    //             password:"password123"
    //         }
    //     }
    //     const req = mockRequest(options);

    //     await authenticate.createCookie()
    // } )
})

describe('DELETE/', () => {
    beforeEach(async () => {
        await knexDB('users').truncate()
    })

    it('delete Daniel User', async () => {
        await db.add({username:'Ernesto', password: 'deleteMethodpassword'});
        await db.add({username: 'Daniel', password: 'deleteMethodthatpassword'});
        await db.remove('Daniel');

        const [user] = await knexDB('users');
        expect(user.username).toBe("Ernesto");
    })

})
