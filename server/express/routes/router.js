//REQUIRED LIBRARIES

require('dotenv').config();

const express = require('express');

//REQUIRED MODULES

const db = require('../../db/dbDeterminer.js');
const { findByUsername, registerUser } = db();
console.log(findByUsername('Ryandw7'))
const authenticateToken = require('../middleware/authenticateToken.js')

//VARIABLES

const router = express.Router()


/* 
POST CONVENTIONS: destructure reqbody, and return reqbody on successful request

*/

//POST - REGISTER USER TO DB at <EXPRESS_URL>/api/register

router.post("/register", async (req, res, next) => {

  const { firstName, lastName, userName, password } = req.body;

  //CATCH ERROR IF ANY VALUE IS MISSING FROM REQ BODY
  if (!firstName || !lastName || !userName || !password) {
    const err = new Error('Missing value in request body');
    err.status = 400;
    return next(err);
  }

  console.log('request recieved successfully');
  console.log(req.body)

  //IF ALL VALUES ARE PRESENT, EXECUTE DB REGISTERUSER
  const response = await registerUser(firstName, lastName, userName, password);

  //THROW ERROR IF ISSUE WITH REGISTERING USER
  if (!response.ok) {
    const err = response.error;
   
    return next(err)
  }
  
  //SEND REQ BODY BACK AS RESPONSE TO CONFIRM USER HAS BEEN REGISTERED
  res.status(201).send(req.body)


});

//POST - LOGIN USER AND GENERATE TOKEN AT <EXPRESS_URL>/api/login

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  console.log('Login request body:', req.body)

  const search = await findByUsername(username);
  console.log(search)

  if(!search.ok){
    const err = new Error('search aint searchin');
    err.status(500)
    return next(err)
  }
  
  console.log('should be good bruv')
  const data = search.data;
   
   res.status(201).send(data)
  
})


router.get('/interactions', authenticateToken, (req, res) => {
  const user = req.user;
  res.status(201).send(req)
})
module.exports = router;
