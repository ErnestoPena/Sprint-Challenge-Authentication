const db = require('./dbConfig');

module.exports = {
    add,
    find,
    findByUsername,
    remove
}

function add(newUser) {
    return db('users').insert(newUser);
}

function find() {
    return db('users');
}

function findByUsername(userName) {
    return db('users').where({userName});
}

function remove(userName) {
    return db('users').where({username:userName}).del()
}