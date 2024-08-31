require('dotenv').config;
const db = require('../../db/dbUtils.js')
const jwt = require("jsonwebtoken");
function generateAccessToken(username) {
    db.findByUsername(username)
    return jwt.sign(username, `${process.env.TOKEN_SECRET}`);
  }

module.exports = generateAccessToken;