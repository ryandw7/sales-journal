const db = require("../db/db");

const client = {
    query: () => {
         return process.env.TEST;
    }
}

module.exports = client;