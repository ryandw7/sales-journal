//REQUIRE BOTH MOCK AND REAL DB MODULES
const { findByUsername, registerUser } = require("./dbUtils");
const { findByUsernameMock, registerUserMock } = require("./dbTestUtils");
require('dotenv').config();

//ENSURE DB_IS_ACTIVE ENVIRONMENTAL IS FUNCTIONING PROPERLY
console.log(process.env.DB_IS_ACTIVE)

//MODULE FUNCTION THAT RETURNS CORRECT MODULE BASED OF DB STATUS
const dbDeterminer = () => {
  
 if(process.env.DB_IS_ACTIVE === 'false'){
    return { findByUsername: findByUsernameMock, registerUser: registerUserMock }
 }else{
    return { findByUsername, registerUser }
 }
}

module.exports = dbDeterminer

