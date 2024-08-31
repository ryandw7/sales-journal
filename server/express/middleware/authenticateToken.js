const jwt = require('jsonwebtoken');
require('dotenv').config();
function authenticateToken(req, res, next) {
    console.log('trying to authenticate token')
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, `${process.env.TOKEN_SECRET}`, (err, user) => {
    console.log(err);

    req.user = user;

    next()
  })
}

module.exports = authenticateToken;