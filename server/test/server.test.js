process.env.MODE = 'test';
const db = require("../db/db");
const mockClient = require('../testServerData/mockClient');

test('db', async () => {
    const query = await db.users.findByUsername('Ryandw7', (err, user) => {
       if(err){
        return err
       }else{
        return user
       }
    });
    expect(query).toEqual('Ryandw7');
})