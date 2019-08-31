const db = require('./dbConfig');

module.exports = {
    add,
    find
}

function add(newUser) {
    return db('users').insert(newUser);
}

function find() {
    return db('users');
}