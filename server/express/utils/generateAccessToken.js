require('dotenv').config;

const jwt = require("jsonwebtoken");
function generateAccessToken(user) {
    delete user.pw
    return jwt.sign(user, `${process.env.TOKEN_SECRET}`);
  }

module.exports = generateAccessToken;
