//REQUIRED LIBRARIES
require('dotenv').config();
const express = require('express');

//REQUIRED MODULES
const db = require('../../db/dbDeterminer.js');
const { findByUsername, registerUser, comparePasswords, getInteractions, addNewInteraction } = db();
const generateAccessToken = require('../utils/generateAccessToken.js')
const authenticateToken = require('../middleware/authenticateToken.js')

//VARIABLES
const router = express.Router()


/* 
POST CONVENTIONS: destructure reqbody, and return reqbody on successful request
*/

//POST - REGISTER USER TO DB at <EXPRESS_URL>/api/register

router.post("/register", async (req, res, next) => {

  const { firstName, lastName, username, password } = req.body;

  //CATCH ERROR IF ANY VALUE IS MISSING FROM REQ BODY
  if (!firstName || !lastName || !username || !password) {
    const err = new Error('Missing value in request body');
    err.status = 400;
    return next(err);
  }

  console.log('request recieved successfully');
  console.log(req.body)

  //IF ALL VALUES ARE PRESENT, EXECUTE DB REGISTERUSER
  const response = await registerUser(firstName, lastName, username, password);

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

  const search = await findByUsername(username);

  if (!search.ok) {
    const err = new Error('search aint searchin');
    err.status = 500;
    return next(err)

  }

  const user = await search.data;
  console.log(user)
  const encryptedPassword = user.pw;

  const passwordAuth = await comparePasswords(encryptedPassword, password);
  console.log(encryptedPassword, password)
  console.log('pw auth', passwordAuth)
  if (passwordAuth === true) {
    const id = user.id;
    const firstName = user.fn;
    const lastName = user.ln;
    const token = generateAccessToken(user);
    res.status(201).send( {username, firstName, lastName, id, token})
  }
  
})


//POST - ADD NEW INTERACTION
router.post('/interactions', authenticateToken, async (req, res, next) => {
  const { firstName, lastName, phoneNumber, note, id } = req.body;
  const addInteraction = await addNewInteraction(id, firstName, lastName, phoneNumber, note);
  if (!addInteraction.ok) {
    const err = new Error('couldnt add :/')
    err.status = 401
    return next(err)
  }

  const data = addInteraction.data;
  res.status(201).send(data)
})
//GET - RETURN LIST OF USER INTERACTIONS BY ID IF PROPERLY AUTHENTICATED

router.get('/interactions', authenticateToken, async (req, res) => {
  console.log('GET - interactions initiated')
  console.log(req)
  const id = req.user.id;
  const interactions = await getInteractions(id);

  res.status(201).send(interactions)

})

module.exports = router;
