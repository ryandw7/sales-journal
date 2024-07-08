const client = require('./pgClient.js');

const dbRegister = async (firstName, lastName, username, password) => {
    const generateId = async () => {
        let uniqueId = false;
        while (uniqueId === false) {
            const id = Math.floor(Math.random() * 100000);;
            console.log(id);
            const query = await client.query('SELECT id FROM users;');
            const rows = query.rows;
            console.log(rows)
            for (const row in rows) {
                if (row != id) {
                    uniqueId = true;
                    console.log(id)
                    return id;
                }
            }
        }
    }
    try {
        const id = await generateId();
        await client.query(`INSERT INTO users (id, fn, ln, un, pw) VALUES(${id}, '${firstName}', '${lastName}', '${username}', '${password}');`);
        return 'User created successfully!'
    } catch (error) {
        console.log(error);
        return error;
    }


}

dbRegister('Ryan', 'Wilson', 'Ryandw7', 'pass7word');
