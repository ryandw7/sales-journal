const express = require('express');
const apiRouter = express.Router();
const { registerUser } = require('../../db/dbUtils.js');

apiRouter.post("/register", async (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;
  if (!firstName || !lastName || !username || !password) {
    const err = new Error('Missing value in request body');
    err.status = 400;
    return next(err);
  }
  registerUser(firstName, lastName, username, password);
  res.status(201).send(req.body);
});

module.exports = apiRouter;
