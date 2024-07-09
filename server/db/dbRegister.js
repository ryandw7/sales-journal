const client = require('./pgClient.js');

const dbRegister = async (firstName, lastName, username, password) => {
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



}

module.exports = dbRegister;