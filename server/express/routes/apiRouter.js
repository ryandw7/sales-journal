
const express = require('express');
const { findByUsername, registerUser } = require('../../db/dbUtils.js')
require('dotenv').config();
const apiRouter = express.Router();
const authenticateToken = require('../middleware/authenticateToken.js')

apiRouter.post("/register", async (req, res, next) => {
  const { firstName, lastName, userName, password } = req.body;
  if (!firstName || !lastName || !userName || !password) {
    const err = new Error('Missing value in request body');
    err.status = 400;
    return next(err);
  }
  console.log('request recieved successfully');
  console.log(req.body)
  const response = await registerUser(firstName, lastName, userName, password);
  if (!response.ok) {
    const err = response.error;
    err.status = 400
    return next(err)
  }
  res.status(201).send(req.body)


});

apiRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  console.log('Login request body:', req.body)

  const search = await findByUsername(username);
  if(!search.ok){
    console.log('err')
    return next(search.err)
  }
  console.log('should be good bruv')
  const data = search.data;

   res.status(201).send(data)
  
})

apiRouter.get('/interactions', authenticateToken, (req, res) => {
  const user = req.user;
  res.status(201).send(req)
})
module.exports = apiRouter;
