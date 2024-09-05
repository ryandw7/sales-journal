
const client = require("./pgClient.js");
const bcrypt = require("bcrypt");
const db = {
    users: {
        findByUsername: async (username) => {
            try {
                const res = await client.query(`SELECT * FROM users WHERE un = '${username}';`);
                const user = await res.rows[0];
                console.log(user)
                if (user != undefined) {
                    return { ok: true, data: user }
                    /* 
                    {
                     ok: true,
                     data: {
                     id: <ID>,
                     fn: <FIRST_NAME>,
                     ln: <LAST_NAME>,
                     un: <USER_NAME>,
                     pw: <PASS_WORD>
                      }
                    }
                    */
                }
                throw new Error('No user with that Username');
            } catch (err) {
                return err
            }
        },

        comparePasswords: async (encryptedPassword, password) => {
            console.log('comparing passwordsssssss')
            const res = await bcrypt.compare(password, encryptedPassword);
            console.log('PW COMPARE: ' + res)
            return res;
        },

        registerUser: async (firstName, lastName, userName, password) => {
            //for registerUser to run their NEEDS to be at least one user 
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
                await client.query(`CREATE TABLE _${id} (fn TEXT, ln TEXT, pn INTEGER, date TEXT, interaction TEXT);`);
                return { ok: true }
            } catch (error) {
                return { ok: false, error: error.message }
            };



        },
        getInteractions: async (id) => {
            const userInteractions = await client.query(`SELECT * FROM _${id};`)
            return userInteractions.rows;
        },

        addNewInteraction: async (id, firstName, lastName, phoneNumber, interaction) => {
          
            const res = await client.query(`INSERT INTO _${id} (fn, ln, pn, date, interaction) VALUES ('${firstName}', '${lastName}', ${phoneNumber}, CURRENT_TIMESTAMP, '${interaction}');`)
            console.log(res)
            return { ok: true }
        }
    }
};
module.exports = {
    findByUsername: db.users.findByUsername,
    registerUser: db.users.registerUser,
    comparePasswords: db.users.comparePasswords,
    getInteractions: db.users.getInteractions,
    addNewInteraction: db.users.addNewInteraction
};