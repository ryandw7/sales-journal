const { Client } = require('pg');

const client = new Client({
    database: 'clientlogtest',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '12081998'
})

client.connect();

module.exports = client;

