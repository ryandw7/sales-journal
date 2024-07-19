const express = require('express');
const apiRouter = express.Router();
const { registerUser } = require('../../db/dbUtils.js');

apiRouter.post("/register", async (req, res, next) => {
  const { firstName, lastName, userName, password } = req.body;
  if (!firstName || !lastName || !userName || !password) {
    const err = new Error('Missing value in request body');
    err.status = 400;
    return next(err);
  }
  console.log('request recieved successfully')
  //registerUser(firstName, lastName, userName, password);
  res.status(201).send(req.body);
});

module.exports = apiRouter;
