const mockDb = require("./mockDb");

const client = {
    query: (string) => {
        console.log(`Mock query initiated with query: ${string}`)
        let queryType;
        let table;
        let signifier;
        let signifierMatcher;
        if (string.includes('SELECT')) {
            queryType = 'SELECT';
        };
        table = string.split('FROM')[1].split(' ')[1];
        if (string.includes('WHERE')) {
            signifier = string.split('WHERE')[1].split(' ')[1];
            signifierMatcher = string.split(signifier)[1].replaceAll('"', '').replace(";", '').replace('= ', '').trim();
        };
       if(signifier === 'un'){
        const res = mockDb.users.filter(item => item.un === signifierMatcher);
        const resObj = {rows: res};
        console.log(signifierMatcher.replace("'", ''))
        return 'Ryandw7';
       }
    }
}

module.exports = client;