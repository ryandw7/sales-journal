const { Client } = require('pg');

const client = new Client({
    database: 'test-sales-journal',
    host: '3.145.16.153',
    port: 5432,
    user: 'postgres',
    password: 'postgres'
})

client.connect();

module.exports = client;