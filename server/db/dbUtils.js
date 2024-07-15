
const client = require("./pgClient")

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
        },
        registerUser: async (firstName, lastName, username, password) => {
            const unQuery = await client.query(`SELECT * FROM users WHERE un = '${username}';`);
            if(unQuery.rows.length > 0){
                 throw new Error('That username is already taken.')
             }
            const generateId = async () => {
                let uniqueId = false;
                while (uniqueId === false) {
                    const id = Math.floor(Math.random() * 100000);;
                    const query = await client.query('SELECT id FROM users;');
                    const rows = query.rows;
                    for (const row in rows) {
                        if (row != id) {
                            uniqueId = true;
                            console.log(id);
                            return id;
                        }
                    }
                }
            }
            try {
                const id = await generateId();
                await client.query(`INSERT INTO users (id, fn, ln, un, pw) VALUES(${id}, '${firstName}', '${lastName}', '${username}', '${password}');`);
                await client.query(`CREATE TABLE _${id} (fName TEXT, lName TEXT, pNumber INTEGER, date TEXT, interaction TEXT);`);
                return 'Success'
            } catch (error) {
                console.log(error);
                return error;
            };



        },
        loginUser: async (username, password) => {
            const unSearch = await client.query(`SELECT * FROM users WHERE un = '${username}';`);
            if (unSearch.rows.length < 1) {
                throw new Error('Username or password is incorrect.');
            } else if (unSearch.rows.length > 0) {
                let user = unSearch.rows[0];
                if (user.pw != password) {
                    console.log(user, password)
                    throw new Error('Username or password is incorrect.')
                } else if (user.pw === password) {
                    console.log(user.id)
                    return user.id;
                }
            }
        }

    }
};
module.exports = {
    findByUsername: db.users.findByUsername,
    registerUser: db.users.registerUser
};