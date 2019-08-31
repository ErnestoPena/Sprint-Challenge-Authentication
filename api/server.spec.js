const request = require('supertest');
require('dotenv').config();
const server = require('./server');

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
})

it('should return a json object', async () =>{
    const res = await request(server).get('/users');
    expect(res.type).toBe('application/json');
})


it('should return {Ernesto_Pena: => Authentication Sprint}', async () => {
    const res = await request(server).get('/');
    expect(res.body).toEqual({Ernesto_Pena: '=> Authentication Sprint'});
})