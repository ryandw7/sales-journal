const jwt = require('jsonwebtoken');
require('dotenv').config();
function authenticateToken(req, res, next) {
 console.log('auth middleware initiated')
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, `${process.env.TOKEN_SECRET}`, (err, user) => {

    if (err) {
      err.message = 'Invalid access token'
      err.status = 401
      return next(err)
    }

    const userObj = {
      id: user.id,
      username: user.un,
      firstName: user.fn,
      lastName: user.ln
    }

    req.user = userObj;

    next()

  })
}

module.exports = authenticateToken;