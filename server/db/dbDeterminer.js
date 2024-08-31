const { findByUsername, registerUser } = require("./dbUtils");
const { findByUsernameMock, registerUserMock } = require("./dbTestUtils");
require('dotenv').config()
const dbDeterminer = () => {
 if(process.env.DB_IS_ACTIVE === false){
    return { findByUsernameMock, registerUserMock }
 }else{
    return { findByUsername, registerUser }
 }
}

module.exports = {
    db: dbDeterminer
}