const { Client } = require('pg');
require('dotenv').config()
const { DATA_BASE, PG_HOST, PG_PORT, PG_USER, PG_PASSWORD } = process.env
const client = new Client({
    database: 'clientlogtest',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '12081998'
})

if(process.env.DB_IS_ACTIVE === "true"){
client.connect();
}
module.exports = client;

