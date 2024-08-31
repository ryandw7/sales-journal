const express = require('express');
const authRouter = express.Router();

authRouter.get('/status', (req, res)=>{
    console.log('auth req recieved');
    console.log(req.isAuthenticated())
    res.json({ isAuthenticated: req.isAuthenticated() })
})

module.exports = authRouter