
const pgClient = require("./pgClient")
const mockClient = require("../testServerData/mockClient");
const client = process.env.MODE === 'test' ? mockClient : pgClient
const db = {
    users: {
        findByUsername: async (username, callback) => {
            try {
                const res = await client.query(`SELECT * FROM users WHERE un = '${username}';`);
                const data = await res.rows[0];
            console.log(data)
                if (data != undefined) {
                    return callback(null, data);
                }
                throw new Error('No user with that username');
            } catch (err) {
                return callback(err, null)
            }
        }
    }
};
module.exports = db;