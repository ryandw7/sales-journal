const { Client } = require('pg');

const client = new Client({
    database: 'sales-journal',
    host: '3.16.47.87',
    port: 5432,
    user: 'postgres',
    password: 'postgres'
})

client.connect();

module.exports = client;