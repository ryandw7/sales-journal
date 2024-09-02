
const express = require('express');
const {db} = require('../../db/dbDeterminer.js');
require('dotenv').config();
const { registerUser } = db;
const apiRouter = express.Router();
const authenticateToken = require('../middleware/authenticateToken.js')

console.log(db())
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

apiRouter.post('/login', (req, res) => {
  const { username, password } = req.body;
  findByUsername(username, async function (err, user) {
    const matchedPassword = await bcrypt.compare(password, user.pw);
      if(err){
        console.log(err);
        return cb(null, false)
      }
      if (!user) {
      console.log('!user')
        return cb(null, false);
      }
      if (!matchedPassword) {
        console.log(matchedPassword, password, user.pw)
        return cb(null, false);
      }
      return cb(null, user);
    })
  console.log("Login request recieved")
  res.status(201).send(req.user)
})

apiRouter.get('/interactions', authenticateToken, (req, res)=>{
  const user = req.user;
  res.status(201).send(req)
})
module.exports = apiRouter;
