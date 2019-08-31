const db = require('./dbConfig');

module.exports = {
    add,
    find,
    findByUsername
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