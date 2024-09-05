//REQUIRE BOTH MOCK AND REAL DB MODULES
const { findByUsername, registerUser, comparePasswords, getInteractions, addNewInteraction } = require("./dbUtils");
const { findByUsernameMock, registerUserMock, comparePasswordsMock, getInteractionsMock, addNewInteractionMock } = require("./dbTestUtils");
require('dotenv').config();

//ENSURE DB_IS_ACTIVE ENVIRONMENTAL IS FUNCTIONING PROPERLY
console.log(process.env.DB_IS_ACTIVE)

//MODULE FUNCTION THAT RETURNS CORRECT MODULE BASED OF DB STATUS
const dbDeterminer = () => {
  
 if(process.env.DB_IS_ACTIVE === 'false'){

    return { findByUsername: findByUsernameMock, registerUser: registerUserMock, comparePasswords: comparePasswordsMock, getInteractions: getInteractionsMock, addNewInteraction: addNewInteractionMock };
 }else{
    return { findByUsername, registerUser, comparePasswords, getInteractions, addNewInteraction }
 }

}

module.exports = dbDeterminer

