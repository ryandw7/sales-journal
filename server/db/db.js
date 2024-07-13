
const client = require(".pgClient")

const db = {
    test: () => {
        const res = client.query();
        return res;
    },
    users: {
        findByUsername: async (username, callback) => {
            try {
                const res = await client.query(`SELECT * FROM users WHERE un = '${username}';`);
                const data = await res.rows[0];
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