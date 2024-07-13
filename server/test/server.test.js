const db = require("../db/db");
process.env.TEST = true;

test('db', ()=>{
    expect(db.test()).toEqual('true')
})