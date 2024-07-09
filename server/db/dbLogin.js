const client = require("./pgClient");

const dbLogin = async (username, password) => {
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

module.exports = dbLogin;