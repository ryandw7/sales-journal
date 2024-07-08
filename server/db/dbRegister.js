const client = require('./pgClient.js');

const dbRegister = async (id, firstName, lastName, username, password) => {
     
        try {
            await client.query(`INSERT INTO users (id, firstName, lastName, un, pw) VALUES(${id}, ${firstName}, ${lastName}, ${username}, ${password});`);
            return 'User created successfully!'
        }catch(error){
            console.log(error);
            return error;
        }
            
        
}

dbRegister(34, 'Ryan', 'Wilson', 'Ryandw7', 'pass7word');
