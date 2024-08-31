const { Client } = require('pg');
require('dotenv').config()
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

