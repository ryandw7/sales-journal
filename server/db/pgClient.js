const { Client } = require('pg');

const client = new Client({
    database: 'database',
    host: 'host',
    port: 'port',
    user: 'user',
    password: 'password'
})

client.connect();

module.exports = client;