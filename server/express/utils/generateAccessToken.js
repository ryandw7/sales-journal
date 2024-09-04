require('dotenv').config;

const db = require('../../db/dbDeterminer.js');
const { findByUsername } = db()
const jwt = require("jsonwebtoken");
function generateAccessToken(username) {
    const user = findByUsername(username);
    const data = user.data;
    return jwt.sign(data, `${process.env.TOKEN_SECRET}`);
  }

module.exports = generateAccessToken;