const { findByUsername, registerUser } = require("./dbUtils");
const { findByUsernameMock, registerUserMock } = require("./dbTestUtils");
require('dotenv').config();
console.log(process.env.DB_IS_ACTIVE)
const dbDeterminer = () => {
   console.log(process.env.DB_IS_ACTIVE)
 if(process.env.DB_IS_ACTIVE == "false"){
    return { findByUsernameMock, registerUserMock }
 }else{
    return { findByUsername, registerUser }
 }
}

module.exports = {
    db: dbDeterminer
}

console.log(dbDeterminer())