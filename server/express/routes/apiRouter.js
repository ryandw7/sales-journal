const express = require('express');
const apiRouter = express.Router();
require('dotenv').config()
const {db} = require('../../db/dbDeterminer.js')
const { registerUser } = db;
const passport = require('../passport.js');
const authRouter = require('./authRouter.js');
apiRouter.use('/auth', authRouter)
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

apiRouter.post('/login', passport.authenticate("local", {session: true, failureMessage: "Login attempt failed :/" }), (req, res) => {
  console.log("Login request recieved")
  res.status(201).send(req.user)
})

apiRouter.get('/interactions', (req, res)=>{
  console.log(req.isAuthenticated)
  res.status(201).send(req)
})
module.exports = apiRouter;
