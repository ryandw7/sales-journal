const express = require('express');
const apiRouter = express.Router();
const { registerUser } = require('../../db/dbUtils.js');
const passport = require('../passport.js');

apiRouter.post("/register", async (req, res, next) => {
  const { firstName, lastName, userName, password } = await req.body;
  if (!firstName || !lastName || !userName || !password) {
    const err = new Error('Missing value in request body');
    err.status = 400;
    return next(err);
  }
  console.log('request recieved successfully');

    const response = await registerUser(firstName, lastName, userName, password);
    console.log(res)

  
    if (!response.ok) {
      const err = response.error;
      err.status = 400
      return next(err)
    }
    res.status(201).send(req.body)

  
});

apiRouter.post('/login', passport.authenticate("local", { failureMessage: "Login attempt failed :/" }), (req, res) => {
  console.log("Login request recieved")
  res.status(201).send("nice")
})

module.exports = apiRouter;
