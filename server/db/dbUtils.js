
const client = require("./pgClient.js");
const bcrypt = require("bcrypt");
const db = {
    users: {
        findByUsername: async (userName, callback) => {
            try {
                const res = await client.query(`SELECT * FROM users WHERE un = '${userName}';`);
                const data = await res.rows[0];
                console.log(data)
                if (data != undefined) {
                    return callback(null, data);
                }
                throw new Error('No user with that userName');
            } catch (err) {
                return callback(err, null)
            }
        },
        registerUser: async (firstName, lastName, userName, password) => {
            try {
                console.log('register try block initiated...')
                const unQuery = await client.query(`SELECT * FROM users WHERE un = '${userName}';`);
                if (unQuery.rows.length > 0) {

                    throw new Error('That userName is already taken.')
                }
                console.log(unQuery.rows)
                const generateId = async () => {
                    let uniqueId = false;
                    while (uniqueId === false) {
                        const id = Math.floor(Math.random() * 100000);
                        const query = await client.query('SELECT id FROM users;');
                        console.log(query)

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

                const id = await generateId();
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt)
                await client.query(`INSERT INTO users (id, fn, ln, un, pw) VALUES(${id}, '${firstName}', '${lastName}', '${userName}', '${hashedPassword}');`);
                await client.query(`CREATE TABLE _${id} (fName TEXT, lName TEXT, pNumber INTEGER, date TEXT, interaction TEXT);`);
                return { ok: true }
            } catch (error) {
                return { ok: false, error: error.message }
            };



        },
        loginUser: async (userName, password) => {
            const unSearch = await client.query(`SELECT * FROM users WHERE un = '${userName}';`);
            if (unSearch.rows.length < 1) {
                throw new Error('userName or password is incorrect.');
            } else if (unSearch.rows.length > 0) {
                let user = unSearch.rows[0];
                if (user.pw != password) {
                    console.log(user, password)
                    throw new Error('userName or password is incorrect.')
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